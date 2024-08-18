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
    expect(typeof result.exec).toBe("function");
    expect(result).toHaveProperty("id", "");
  });

  it("creates an object with specified values", () => {
    const result = createCommandDefinition({
      exec: () => "exec",
      id: "id",
    });
    expect(result.exec()).toBe("exec");
    expect(result).toHaveProperty("id", "id");
  });

  it("creates an object with partial initial values", () => {
    const result = createCommandDefinition({});
    expect(result.exec()).toBe(undefined);
    expect(result).toHaveProperty("id", "");
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
      "Command ID commandX is not defined",
    );
  });
});
