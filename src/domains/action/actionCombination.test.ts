import { beforeEach, describe, expect, it, vi } from "vitest";
import { Action, breakActions } from "./Action";
import {
  CommandDefinition,
  execCommand,
  pickCommandDefinition,
} from "./CommandDefinition";
import { ConditionFunctionMap, createConditionFunction } from "./Condition";
import { KeyboardShortcut, findShortcut } from "./KeyboardShortcut";

describe("action", () => {
  let actions: Action[];
  let commands: CommandDefinition[];
  let shortcuts: KeyboardShortcut[];
  let conditions: ConditionFunctionMap;

  describe("command", () => {
    beforeEach(() => {
      actions = prepareActions();
      [commands, shortcuts] = breakActions(actions);
    });

    it("runs by ID", () => {
      const command = pickCommandDefinition(commands, "action1");
      command.exec();

      expect(actions[0].exec).toBeCalledWith();
    });
  });

  describe("shortcuts", () => {
    beforeEach(() => {
      actions = prepareActions();
      [commands, shortcuts] = breakActions(actions);
      conditions = prepareConditions();
    });

    it("runs shortcut", () => {
      const key = "Ctrl+X";

      const shortcut = findShortcut(shortcuts, key, conditions);
      execCommand(commands, shortcut!.commandId, shortcut!.args);

      expect(actions[0].exec).toBeCalledWith(1, 2);
    });
  });
});

function prepareActions(): Action[] {
  return [
    {
      exec: vi.fn(),
      id: "action1",
      patterns: [
        {
          args: [1, 2],
          keyboard: "Ctrl+X",
          when: "focus:canvas",
        },
      ],
      title: "Action 1",
    },
  ];
}

function prepareConditions(): ConditionFunctionMap {
  return {
    focus: createConditionFunction(
      "",
      "focus:canvas",
      (args) => args[0] === "canvas",
    ),
  };
}
