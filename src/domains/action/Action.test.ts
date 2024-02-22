import { describe, expect, it } from "vitest";
import { Action, breakActions } from "./Action";

describe("breakActions()", () => {
  it("builds", () => {
    const actions: Action[] = [
      {
        exec() {
          return 1;
        },
        id: "action1",
        shortcuts: [
          {
            key: "Ctrl+A",
          },
          {
            key: "Enter",
          },
        ],
        title: "Action 1",
      },
      {
        exec() {
          return 2;
        },
        id: "action2",
        shortcuts: [],
        title: "Action 2",
      },
    ];

    const [commands, shortcuts] = breakActions(actions);

    expect(commands.length).toBe(2);
    expect(commands[0].id).toBe("action1");

    expect(commands).toEqual([
      {
        exec: actions[0].exec,
        id: "action1",
        title: "Action 1",
      },
      {
        exec: actions[1].exec,
        id: "action2",
        title: "Action 2",
      },
    ]);

    expect(shortcuts).toEqual([
      {
        commandId: "action1",
        key: "Ctrl+A",
        when: "",
      },
      {
        commandId: "action1",
        key: "Enter",
        when: "",
      },
    ]);
  });
});
