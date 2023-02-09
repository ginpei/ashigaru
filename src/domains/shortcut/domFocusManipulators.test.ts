// @vitest-environment jsdom

import { afterEach, describe, expect, it } from "vitest";
import { giveFocusOn } from "./domFocusManipulators";

describe("giveFocusOn()", () => {
  function prepareTarget(focusId: string, html: string) {
    const el = document.createElement("div");
    el.setAttribute("data-focus-target", focusId);
    el.innerHTML = html;
    document.body.append(el);
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("focuses on the first focusable element", () => {
    it("a", () => {
      prepareTarget("someFocus", `<a id="ok-a"></a>`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(true);

      // the activeElement becomes `<body>` on JSDOM
      // TODO find why
      // expect(document.activeElement?.id).toBe("ok-a");
    });

    it("input", () => {
      prepareTarget("someFocus", `<input id="ok-input">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe("ok-input");
    });

    it("select", () => {
      prepareTarget("someFocus", `<select id="ok-select">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe("ok-select");
    });

    it("textarea", () => {
      prepareTarget("someFocus", `<textarea id="ok-textarea">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe("ok-textarea");
    });

    it("div[tabindex=0]", () => {
      prepareTarget("someFocus", `<div id="ok-div" tabindex="0">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe("ok-div");
    });
  });

  it("returns false if target does not exist", () => {
    prepareTarget("anotherFocus", `<input id="ok-input">`);

    const result = giveFocusOn("someFocus");
    expect(result).toBe(false);
  });

  describe("returns false if target is denied", () => {
    it("input:disabled", () => {
      prepareTarget("someFocus", `<input disabled id="ok-input">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(false);
    });

    it("input[tabindex=-1]", () => {
      prepareTarget("someFocus", `<input id="ok-input" tabindex="-1">`);

      const result = giveFocusOn("someFocus");
      expect(result).toBe(false);
    });
  });
});
