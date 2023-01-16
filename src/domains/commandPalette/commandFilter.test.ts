import { describe, expect, it } from "vitest";
import {
  CommandDefinition,
  createCommandDefinition,
} from "../command/CommandDefinition";
import { isCommandMatched } from "./commandFilter";

describe("commandFilter", () => {
  it("matches if no filters", () => {
    const command = createCommandDefinition({ title: "Command 1" });
    const result = isCommandMatched(command, { keyword: "" });
    expect(result).toBe(true);
  });

  describe("keyword", () => {
    it("matches title in case insensitive", () => {
      const command = createCommandDefinition({ title: "---CoMMand 11---" });
      const result = isCommandMatched(command, { keyword: "command 1" });
      expect(result).toBe(true);
    });
  });
});
