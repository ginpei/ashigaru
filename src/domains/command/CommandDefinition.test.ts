import { describe, expect, it } from "vitest";
import {
  createCommandDefinition,
  findCommandDefinition,
  pickCommandDefinition,
} from "./CommandDefinition";

const noop = () => null;

describe("createCommandDefinition()", () => {
  it("creates an object without initial values", () => {
    const result = createCommandDefinition();
    expect(typeof result.action).toBe("function");
    expect(result).toContain({
      id: "",
      title: "",
    });
  });

  it("creates an object with specified values", () => {
    const result = createCommandDefinition({
      action: () => "action",
      id: "id",
      title: "title",
    });
    expect(result.action(null, noop)).toBe("action");
    expect(result).toContain({
      id: "id",
      title: "title",
    });
  });

  it("creates an object with partial initial values", () => {
    const result = createCommandDefinition({ title: "title" });
    expect(result.action(null, noop)).toBe(undefined);
    expect(result).toContain({
      id: "",
      title: "title",
    });
  });
});

describe("findCommandDefinition()", () => {
  it("returns the one that the ID matches", () => {
    const command = createCommandDefinition({ id: "command1" });
    const result = findCommandDefinition([command], "command1");
    expect(result).toBe(command);
  });

  it("returns null if nothing matched", () => {
    const command = createCommandDefinition({ id: "command1" });
    const result = findCommandDefinition([command], "commandX");
    expect(result).toBe(null);
  });
});

describe("pickCommandDefinition()", () => {
  it("returns the one that the ID matches", () => {
    const command = createCommandDefinition({ id: "command1" });
    const result = pickCommandDefinition([command], "command1");
    expect(result).toBe(command);
  });

  it("throw if nothing matched", () => {
    const command = createCommandDefinition({ id: "command1" });
    expect(() => pickCommandDefinition([command], "commandX")).toThrowError(
      "Command ID commandX is not defined"
    );
  });
});
