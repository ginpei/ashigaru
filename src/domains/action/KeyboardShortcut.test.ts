import { beforeEach, describe, expect, it } from "vitest";
import { ConditionFunctionMap, createConditionFunction } from "./Condition";
import {
  createKeyboardShortcut,
  findShortcut,
  KeyboardShortcut,
} from "./KeyboardShortcut";

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

const shortcuts: KeyboardShortcut[] = [
  {
    commandId: "withCondition1",
    key: "Ctrl+X",
    when: "condition1",
  },
  {
    commandId: "noConditions",
    key: "Ctrl+X",
  },
];

describe("findShortcut", () => {
  it("skips item that conditions does not match", () => {
    const conditions: ConditionFunctionMap = {
      condition1: createConditionFunction("Test", "condition1", () => false),
    };
    const result = findShortcut(shortcuts, "Ctrl+X", conditions);
    expect(result?.commandId).toBe("noConditions");
  });

  it("finds item that condition matches", () => {
    const conditions: ConditionFunctionMap = {
      condition1: createConditionFunction("Test", "condition1", () => true),
    };
    const result = findShortcut(shortcuts, "Ctrl+X", conditions);
    expect(result?.commandId).toBe("withCondition1");
  });

  it("returns undefined in nothing matched", () => {
    const conditions: ConditionFunctionMap = {};
    const result = findShortcut(shortcuts, "Ctrl+Shift+X", conditions);
    expect(result).toBe(undefined);
  });
});
