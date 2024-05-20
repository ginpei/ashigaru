import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ConditionFunctionMap,
  createConditionFunction,
  doesConditionMatch,
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
