import { expect, test } from "@playwright/test";

test("renders every confirmed wheel counted by the finder", async ({ page }) => {
  await page.goto("/fitment");
  await page.getByRole("button", { name: "Check illustrated fitment" }).click();

  const heading = await page.locator(".result-heading h2").innerText();
  const claimedMatches = Number.parseInt(heading, 10);

  await expect(page.locator(".compact-result")).toHaveCount(claimedMatches);
});

test("keeps the mobile wheel catalogue heading within a compact first fold", async ({ page }) => {
  await page.goto("/wheels");

  const heading = page.locator(".page-hero h1");
  const box = await heading.boundingBox();

  expect(box).not.toBeNull();
  expect(box!.height).toBeLessThanOrEqual(240);
});
