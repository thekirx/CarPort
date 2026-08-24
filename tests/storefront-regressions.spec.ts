import { expect, test, type Page } from "@playwright/test";

/**
 * The finder is a client component, so a click can land before hydration attaches
 * the handler. Retry until the result actually renders rather than racing it.
 */
async function submitFinder(page: Page) {
  const button = page.getByRole("button", { name: "Check illustrated fitment" });
  await expect(async () => {
    await button.click();
    await expect(page.locator(".fit-record")).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 20000 });
}

test("renders every confirmed wheel counted by the finder", async ({ page }) => {
  await page.goto("/fitment");
  await submitFinder(page);

  const heading = await page.locator(".result-heading h2").innerText();
  const claimedMatches = Number.parseInt(heading, 10);

  await expect(page.locator(".compact-result")).toHaveCount(claimedMatches);
});

test("shows the engine's working, not just a verdict", async ({ page }) => {
  await page.goto("/fitment");
  await submitFinder(page);

  // A stock-height pass runs all seven rules and reports each one.
  await expect(page.locator(".fit-record > div")).toHaveCount(7);
  await expect(page.locator(".fit-record")).toContainText("Bolt pattern");
  await expect(page.locator(".fit-record")).toContainText("Offset");
});

test("stops the record at the point of uncertainty for a modified car", async ({ page }) => {
  await page.goto("/fitment");
  await submitFinder(page);
  await page.getByRole("radio", { name: "lowered" }).check();
  await submitFinder(page);

  // Dimensional checks still pass; ride height is where it stops and hands over.
  await expect(page.locator(".fit-record > div")).toHaveCount(6);
  await expect(page.locator(".fit-record .cross")).toHaveCount(1);
  await expect(page.locator(".staff-gate")).toContainText("Reservation stays locked");
});

test("keeps the mobile wheel catalogue heading within a compact first fold", async ({ page }) => {
  await page.goto("/wheels");

  // Selector-agnostic: whatever the page header is called, the h1 must stay small…
  const box = await page.locator("h1").first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeLessThanOrEqual(140);

  // …and product must be reachable inside the first viewport, not below a hero.
  const card = await page.locator(".wheel-card").first().boundingBox();
  expect(card).not.toBeNull();
  expect(card!.y).toBeLessThanOrEqual(900);
});
