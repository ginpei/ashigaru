import { describe, expect, it } from "vitest";
import {
  CommandDefinition,
  createCommandDefinition,
} from "../command/CommandDefinition";
import { filterCommands } from "./commandFilter";

describe("commandFilter", () => {
  it("returns everything if no filters", () => {
    const commands: CommandDefinition<{}>[] = [
      createCommandDefinition({ title: "Command 1" }),
    ];
    const result = filterCommands(commands, { keyword: "" });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("command1");
  });

  describe("keyword", () => {
    it("matches title in case insensitive", () => {
      const commands: CommandDefinition<{}>[] = [
        createCommandDefinition({ title: "Command 1" }),
        createCommandDefinition({ title: "Command 2" }),
        createCommandDefinition({ title: "CoMMand 11" }),
      ];
      const result = filterCommands(commands, { keyword: "command 1" });
      expect(result.length).toBe(2);
      expect(result[0].title).toBe("Command 1");
      expect(result[1].title).toBe("CoMMand 11");
    });
  });
});
