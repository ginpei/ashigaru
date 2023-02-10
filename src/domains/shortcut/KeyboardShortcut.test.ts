import { describe, expect, it } from "vitest";
import { createKeyboardShortcut, KeyboardShortcut } from "./KeyboardShortcut";

describe("createKeyboardShortcut()", () => {
  it("creates an object without initial values", () => {
    const result = createKeyboardShortcut();
    expect(result).toEqual({
      commandId: "",
      key: "",
      when: "",
    });
  });

  it("creates an object with specified values", () => {
    const result = createKeyboardShortcut({
      commandId: "commandId",
      key: "key",
      when: "when",
    });
    expect(result).toEqual({
      commandId: "commandId",
      key: "key",
      when: "when",
    });
  });
});
