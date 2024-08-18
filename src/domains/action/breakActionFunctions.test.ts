import { beforeEach, describe, expect, it } from "vitest";
import { Action } from "./Action";
import { breakActions } from "./breakActionFunctions";

describe("breakActions()", () => {
  describe("basic build", () => {
    let actions: Action[];
    let result: ReturnType<typeof breakActions>;

    beforeEach(() => {
      actions = [
        {
          exec() {
            return 1;
          },
          id: "action1",
          patterns: [
            {
              keyboard: "Ctrl+A",
              title: "action 1",
            },
            {
              args: [123],
              keyboard: "Enter",
              title: "action 1 with args",
            },
            {
              title: "Title only",
            },
            {
              keyboard: "Escape",
            },
          ],
        },
        {
          exec() {
            return 2;
          },
          id: "action2",
          patterns: [],
        },
      ];

      result = breakActions(actions);
    });

    it("breaks actions down to parts", () => {
      expect(result.length).toBe(3);
    });

    it("builds commands", () => {
      const commands = result[0];
      expect(commands).toEqual([
        {
          exec: actions[0].exec,
          id: "action1",
        },
        {
          exec: actions[1].exec,
          id: "action2",
        },
      ]);
    });

    it("builds shortcuts", () => {
      const shortcuts = result[1];
      expect(shortcuts).toEqual([
        {
          args: [],
          commandId: "action1",
          keyboard: "Ctrl+A",
          when: "",
        },
        {
          args: [123],
          commandId: "action1",
          keyboard: "Enter",
          when: "",
        },
        {
          args: [],
          commandId: "action1",
          keyboard: "Escape",
          when: "",
        },
      ]);
    });

    it("builds command palette options", () => {
      const options = result[2];
      expect(options).toEqual([
        {
          args: [],
          commandId: "action1",
          keyboard: "Ctrl+A",
          title: "action 1",
          when: "",
        },
        {
          args: [123],
          commandId: "action1",
          keyboard: "Enter",
          title: "action 1 with args",
          when: "",
        },
        {
          args: [],
          commandId: "action1",
          keyboard: "",
          title: "Title only",
          when: "",
        },
      ]);
    });
  });

  it("skips patterns without keyboard shortcuts", () => {
    const actions: Action[] = [
      {
        exec() {
          return 1;
        },
        id: "action1",
        patterns: [
          {
            keyboard: "Enter",
            title: "Enter",
          },
          {
            title: "No keyboard shortcuts",
          },
        ],
        title: "Action 1",
      },
    ];
    const [, shortcuts] = breakActions(actions);

    expect(shortcuts).toEqual([
      {
        args: [],
        commandId: "action1",
        keyboard: "Enter",
        when: "",
      },
    ]);
  });
});
