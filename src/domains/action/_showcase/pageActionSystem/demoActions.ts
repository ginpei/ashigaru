import { useMemo } from "react";
import { Action } from "../../Action";

export function useDemoActions(): Action[] {
  return useMemo(
    () => [
      {
        exec() {
          window.alert("One");
        },
        id: "command1",
        patterns: [{ keyboard: "Ctrl+Alt+1", title: "One" }],
      },
      {
        exec() {
          window.alert("Two");
        },
        id: "command2",
        patterns: [],
      },
      {
        exec() {
          window.alert("Three");
        },
        id: "command3",
        patterns: [],
      },
      {
        exec(message = "(No message)") {
          window.alert(message);
        },
        id: "say",
        patterns: [
          { args: ["Hello World!"], keyboard: "Ctrl+S", title: "Say Hello" },
          { args: ["Yo!"], keyboard: "Ctrl+Shift+S", title: "Say Yo" },
        ],
      },
    ],
    [],
  );
}
