import { describe, expect, it, vi } from "vitest";
import {
  ConditionFunctionMap,
  ConditionToken,
  createConditionFunction,
  doesConditionMatch,
  tokenizeConditionString,
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

  it("gives args to the function", () => {
    const fn = vi.fn((args) => args[0] === "11" && args[1] === "22");
    const conditions: ConditionFunctionMap = {
      foo: createConditionFunction("Test", "foo", fn),
    };
    const result = doesConditionMatch("foo:11,22", conditions);
    expect(fn).toBeCalledWith(["11", "22"]);
    expect(result).toBe(true);
  });
});

describe("tokenizeConditionString()", () => {
  it("returns multiple tokens with symbols", () => {
    const expression = "foo && !bar || boo:arg && !name_space.prop:arg1,arg_2";
    const result = tokenizeConditionString(expression);

    expect(result).toEqual({
      type: "operator",
      key: "||",
      left: {
        type: "operator",
        key: "&&",
        left: { type: "function", key: "foo", negative: false, arg: "" },
        right: { type: "function", key: "bar", negative: true, arg: "" },
      },
      right: {
        type: "operator",
        key: "&&",
        left: { type: "function", key: "boo", negative: false, arg: "arg" },
        right: {
          type: "function",
          key: "name_space.prop",
          negative: true,
          arg: "arg1,arg_2",
        },
      },
    } satisfies ConditionToken);
  });

  it("does not require spaces", () => {
    const expression = "foo&&!bar:arg";
    const result = tokenizeConditionString(expression);

    expect(result).toEqual({
      type: "operator",
      key: "&&",
      left: { type: "function", key: "foo", negative: false, arg: "" },
      right: { type: "function", key: "bar", negative: true, arg: "arg" },
    });
  });

  it("throws invalid condition function name using '-'", () => {
    expect(() => {
      const expression = "foo-bar";
      const result = tokenizeConditionString(expression);
    }).toThrow("Invalid condition function");
  });

  it("throws for operator without expression", () => {
    expect(() => {
      const expression = "foo&&";
      const result = tokenizeConditionString(expression);
    }).toThrow("Empty condition string");
  });

  it("throws for invalid operator pairs", () => {
    expect(() => {
      const expression = "foo&&||";
      const result = tokenizeConditionString(expression);
    }).toThrow("Empty condition string");
  });
});
