import { describe, expect, it } from "vitest";
import { createKeyboardShortcut, KeyboardShortcut } from "./KeyboardShortcut";

describe("createKeyboardShortcut()", () => {
  it("creates an object without initial values", () => {
    const result = createKeyboardShortcut();
    expect(result).toEqual({
      args: [],
      commandId: "",
      key: "",
      when: "",
    });
  });

  it("creates an object with specified values", () => {
    const result = createKeyboardShortcut({
      args: ["args", 1],
      commandId: "commandId",
      key: "key",
      when: "when",
    });
    expect(result).toEqual({
      args: ["args", 1],
      commandId: "commandId",
      key: "key",
      when: "when",
    });
  });
});
