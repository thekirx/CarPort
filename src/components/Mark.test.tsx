import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Mark } from "./Mark";

describe("Carport brand lockup", () => {
  it("renders the approved brand-book CW vector instead of the temporary C tile", () => {
    const markup = renderToStaticMarkup(<Mark />);

    expect(markup).toContain('viewBox="0 0 924 1178"');
    expect(markup).toContain("M0,0 L462,263 L924,0");
    expect(markup).toContain("CARPORT");
    expect(markup).toContain("WHEELS");
    expect(markup).not.toContain('mark-symbol">C');
  });
});
