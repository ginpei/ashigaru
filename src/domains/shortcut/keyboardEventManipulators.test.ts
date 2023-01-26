import { describe, expect, it } from "vitest";
import { keyboardEventToInputCommand } from "./keyboardEventManipulators";

describe("keyboardEventToInputCommand", () => {
  describe("returns with modifier keys", () => {
    it("ctrl", () => {
      const result = keyboardEventToInputCommand(
        createKeyboardEvent({
          altKey: false,
          ctrlKey: true,
          key: "a",
          shiftKey: false,
          metaKey: false,
        })
      );
      expect(result).toBe("Ctrl+A");
    });

    it("alt", () => {
      const result = keyboardEventToInputCommand(
        createKeyboardEvent({
          altKey: true,
          ctrlKey: false,
          key: "a",
          shiftKey: false,
          metaKey: false,
        })
      );
      expect(result).toBe("Alt+A");
    });

    it("shift", () => {
      const result = keyboardEventToInputCommand(
        createKeyboardEvent({
          altKey: false,
          ctrlKey: false,
          key: "a",
          shiftKey: true,
          metaKey: false,
        })
      );
      expect(result).toBe("Shift+A");
    });

    it("all of them", () => {
      const result = keyboardEventToInputCommand(
        createKeyboardEvent({
          altKey: true,
          ctrlKey: true,
          key: "a",
          shiftKey: true,
          metaKey: false,
        })
      );
      expect(result).toBe("Ctrl+Alt+Shift+A");
    });
  });

  it("returns mapped symbols", () => {
    const result = keyboardEventToInputCommand(
      createKeyboardEvent({
        altKey: false,
        ctrlKey: false,
        key: " ",
        shiftKey: false,
        metaKey: false,
      })
    );
    expect(result).toBe("Space");
  });
});

function createKeyboardEvent(
  init: Pick<
    KeyboardEvent,
    "altKey" | "ctrlKey" | "key" | "shiftKey" | "metaKey"
  >
): KeyboardEvent {
  const mock = new Proxy(init, {
    get(target, prop) {
      if (prop in target) {
        return target[prop as keyof typeof target];
      }

      throw new Error(`Property "${String(prop)}" is not mocked`);
    },
  });
  return mock as KeyboardEvent;
}
