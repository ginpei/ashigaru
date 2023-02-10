import { describe, expect, it } from "vitest";
import { Action, buildActions } from "./Action";

describe("buildActions()", () => {
  it("builds", () => {
    const actions: Action[] = [
      {
        action() {
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
        action() {
          return 2;
        },
        id: "action2",
        shortcuts: [],
        title: "Action 2",
      },
    ];

    const [commands, shortcuts] = buildActions(actions);

    expect(commands.length).toBe(2);
    expect(commands[0].id).toBe("action1");

    expect(commands).toEqual([
      {
        action: actions[0].action,
        id: "action1",
        title: "Action 1",
      },
      {
        action: actions[1].action,
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
