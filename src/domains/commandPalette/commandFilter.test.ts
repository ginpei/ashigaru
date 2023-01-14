import { describe, expect, it } from "vitest";
import { CommandDefinition } from "../command/CommandDefinition";
import { filterCommands } from "./commandFilter";

describe("commandFilter", () => {
  it("returns everything if no filters", () => {
    const commands: CommandDefinition<{}>[] = [
      {
        action() {},
        id: "command1",
        title: "Command 1",
      },
    ];
    const result = filterCommands(commands, { keyword: "" });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("command1");
  });

  describe("keyword", () => {
    it("matches title in case insensitive", () => {
      const commands: CommandDefinition<{}>[] = [
        {
          action() {},
          id: "command1",
          title: "Command 1",
        },
        {
          action() {},
          id: "command2",
          title: "Command 2",
        },
        {
          action() {},
          id: "command11",
          title: "COMmand 11",
        },
      ];
      const result = filterCommands(commands, { keyword: "command 1" });
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("command1");
      expect(result[1].id).toBe("command11");
    });
  });
});
