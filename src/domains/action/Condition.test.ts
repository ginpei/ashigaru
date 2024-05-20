import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ConditionFunctionMap,
  createConditionFunction,
  doesConditionMatch,
  parseConditionString,
} from "./Condition";

describe("doesConditionMatch()", () => {
  it("returns true if function returned it", () => {
    const fn = vi.fn(() => true);
    const conditions: ConditionFunctionMap = {
      isOk: createConditionFunction("Test", "isOk", fn),
    };
    const result = doesConditionMatch("isOk", conditions);
    expect(result).toBe(true);
    expect(fn).toBeCalled();
  });

  it("returns false if function returned it", () => {
    const fn = vi.fn(() => false);
    const conditions: ConditionFunctionMap = {
      isOk: createConditionFunction("Test", "isOk", fn),
    };
    const result = doesConditionMatch("isOk", conditions);
    expect(result).toBe(false);
    expect(fn).toBeCalled();
  });

  it("returns false if no functions matched", () => {
    const fn = vi.fn(() => true);
    const conditions: ConditionFunctionMap = {
      secret: createConditionFunction("Test", "secret", fn),
    };
    const result = doesConditionMatch("isOk", conditions);
    expect(result).toBe(false);
    expect(fn).not.toBeCalled();
  });
});

describe("parseConditionString()", () => {
  it("returns multiple tokens with symbols", () => {
    const expression = "foo && !bar || boo:arg && !name_space.prop:arg1,arg_2";
    const result = parseConditionString(expression);

    expect(result).toEqual([
      { type: "function", key: "foo", negative: false },
      { type: "operator", key: "&&" },
      { type: "function", key: "bar", negative: true },
      { type: "operator", key: "||" },
      { type: "function", key: "boo", negative: false, arg: "arg" },
      { type: "operator", key: "&&" },
      {
        type: "function",
        key: "name_space.prop",
        negative: true,
        arg: "arg1,arg_2",
      },
    ]);
  });

  it("does not require spaces", () => {
    const expression = "foo&&!bar:arg";
    const result = parseConditionString(expression);

    expect(result).toEqual([
      { type: "function", key: "foo", negative: false },
      { type: "operator", key: "&&" },
      { type: "function", key: "bar", negative: true, arg: "arg" },
    ]);
  });

  it("throws for operator without expression", () => {
    expect(() => {
      const expression = "foo&&";
      const result = parseConditionString(expression);
    }).toThrow("Invalid operator pair");
  });

  it("throws for invalid operator pairs", () => {
    expect(() => {
      const expression = "foo&&||";
      const result = parseConditionString(expression);
    }).toThrow("Invalid operator order");
  });
});
