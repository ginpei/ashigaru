import { beforeEach, describe, expect, it } from "vitest";
import { Action, breakActions } from "./Action";

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
              key: "Ctrl+A",
              title: "action 1",
            },
            {
              args: [123],
              key: "Enter",
              title: "action 1 with args",
            },
            {
              title: "Title only",
            },
            {
              key: "Escape",
            },
          ],
        },
        {
          exec() {
            return 2;
          },
          id: "action2",
          patterns: [],
          title: "Action 2",
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
          key: "Ctrl+A",
          when: "",
        },
        {
          args: [123],
          commandId: "action1",
          key: "Enter",
          when: "",
        },
        {
          args: [],
          commandId: "action1",
          key: "Escape",
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
          key: "Ctrl+A",
          title: "action 1",
          when: "",
        },
        {
          args: [123],
          commandId: "action1",
          key: "Enter",
          title: "action 1 with args",
          when: "",
        },
        {
          args: [],
          commandId: "action1",
          key: "",
          title: "Title only",
          when: "",
        },
      ]);
    });
  });

  it("skips patterns without key as shortcuts", () => {
    const actions: Action[] = [
      {
        exec() {
          return 1;
        },
        id: "action1",
        patterns: [
          {
            key: "Enter",
            title: "Enter",
          },
          {
            title: "No key",
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
        key: "Enter",
        when: "",
      },
    ]);
  });
});
