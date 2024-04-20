import { beforeEach, describe, expect, it, vi } from "vitest";
import { Action, breakActions } from "./Action";
import { CommandDefinition, pickCommandDefinition } from "./CommandDefinition";
import { KeyboardShortcut } from "./KeyboardShortcut";

type ConditionFunction = ((args?: any[]) => boolean) & {
  key: string;
  source: string;
};
type ConditionFunctionMap = { [key: string]: ConditionFunction };

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

    it("runs keyboard", () => {
      const key = "Ctrl+X";

      const shortcut = pickShortcutDefinition(shortcuts, conditions, key);
      const command = pickCommandDefinition(commands, shortcut.commandId);
      command.exec(...(shortcut.args ?? []));

      expect(actions[0].exec).toBeCalledWith(1, 2);
    });
  });
});

function prepareActions(): Action[] {
  return [
    {
      exec: vi.fn(),
      id: "action1",
      shortcuts: [
        {
          args: [1, 2],
          key: "Ctrl+X",
          when: "focus:canvas",
        },
      ],
      title: "Action 1",
    },
  ];
}

function prepareConditions(): ConditionFunctionMap {
  return {
    "focus:canvas": createConditionFunction("", "focus:canvas", () => true),
  };
}

function pickShortcutDefinition(
  shortcuts: KeyboardShortcut[],
  conditions: ConditionFunctionMap,
  key: string,
): KeyboardShortcut {
  let result: KeyboardShortcut | undefined = undefined;

  for (const shortcut of shortcuts) {
    const conditionKey = shortcut.when;
    const condition = conditionKey ? conditions[conditionKey] : undefined;

    if (shortcut.key === key && condition?.()) {
      result = shortcut;
      break;
    }
  }

  if (!result) {
    throw new Error(`Shortcut not found: ${key}`);
  }

  return result;
}

function createConditionFunction(
  source: string,
  key: string,
  fn: (args?: any[]) => boolean,
): ConditionFunction {
  const condition = (() => fn()) as ConditionFunction; // not to modify the original function instance
  condition.key = key;
  condition.source = source;
  return condition;
}
