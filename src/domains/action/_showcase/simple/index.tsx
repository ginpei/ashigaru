import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "../../../dialog/Dialog";
import { HStack } from "../../../layout/HStask";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1, NiceH2 } from "../../../nice/NiceH";
import { NiceInput } from "../../../nice/NiceInput";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { Action, breakActions } from "../../Action";
import { execCommand } from "../../CommandDefinition";
import { ConditionFunctionMap, createConditionFunction } from "../../Condition";
import { useShortcutRunner } from "../../keyboardShortcutHooks";

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"] as const;

interface PageState {
  fruits: (typeof fruits)[number][];
  message: string;
  number: number;
  shortcutListOpen: boolean;
}

export function SimpleActionDemoPage(): JSX.Element {
  const [state, setState] = useState<PageState>({
    fruits: ["Apple"],
    message: "",
    number: 0,
    shortcutListOpen: false,
  });

  const [commands, shortcuts] = useDemoPageActions(state, setState);
  const conditions = useDemoPageConditions(state);
  useShortcutRunner(commands, shortcuts, conditions);

  const onSelectAllClick = () => {
    execCommand(commands, "toggleAll", [true]);
  };

  const onUnselectAllClick = () => {
    execCommand(commands, "toggleAll", [false]);
  };

  const onFruitChange = (fruit: (typeof fruits)[number]) => {
    setState((prev) => {
      // toggle the fruit
      const fruits = prev.fruits.includes(fruit)
        ? prev.fruits.filter((f) => f !== fruit)
        : [...prev.fruits, fruit];

      return { ...prev, fruits };
    });
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;
    setState((prev) => {
      return { ...prev, message };
    });
  };

  const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setState((prev) => {
      return { ...prev, number: value };
    });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execCommand(commands, "submitForm");
  };

  return (
    <StraightLayout title="Simple action demos">
      <VStack>
        <NiceH1>Simple action demos</NiceH1>
        <p>
          An action can be called as a command, or invoked by a keyboard
          shortcut.
        </p>
        <p>
          <NiceButton
            onClick={() => setState((v) => ({ ...v, shortcutListOpen: true }))}
          >
            Shortcut list
          </NiceButton>
        </p>
        <div
          className="
          flex flex-col gap-4 border border-transparent
          focus-within:bg-yellow-100 hover:border-yellow-600
          [&:focus-within_.shortcutList]:visible
          "
          data-focus="ui1"
          tabIndex={-1}
        >
          <NiceH2>UI 1</NiceH2>
          <p>
            Selected:{" "}
            {state.fruits.length > 0 ? state.fruits.join(", ") : "(none)"}
          </p>
          <HStack>
            <NiceButton onClick={onSelectAllClick}>Select All</NiceButton>
            <NiceButton onClick={onUnselectAllClick}>Unselect All</NiceButton>
          </HStack>
          <ul className="ui-ul">
            {fruits.map((fruit) => (
              <li key={fruit}>
                <label>
                  <input
                    checked={state.fruits.includes(fruit)}
                    onChange={() => onFruitChange(fruit)}
                    type="checkbox"
                  />{" "}
                  {fruit}
                </label>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <ul className="shortcutList ui-ul invisible">
            <li>
              <NiceCode>Ctrl+A</NiceCode> : Select all
            </li>
            <li>
              <NiceCode>Ctrl+Shift+A</NiceCode> : Unselect all
            </li>
          </ul>
        </div>
        <div
          className="
          flex flex-col gap-4 border border-transparent
          focus-within:bg-yellow-100
          hover:border-yellow-600
          [&:focus-within_.shortcutList]:visible
          "
          data-focus="ui2"
          tabIndex={-1}
        >
          <NiceH2>UI 2</NiceH2>
          <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
            <p>
              Some message:
              <br />
              <textarea
                className="w-full rounded-md border border-gray-300 p-2"
                onChange={onMessageChange}
                value={state.message}
              />
            </p>
            <p className="flex justify-between">
              <label>
                Some number:{" "}
                <NiceInput
                  className="w-24 px-0 text-center"
                  data-focus="the-number"
                  type="number"
                  value={state.number}
                  onChange={onNumberChange}
                />
              </label>
              <NiceButton>Send</NiceButton>
            </p>
          </form>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <ul className="shortcutList ui-ul invisible">
            <li>
              <NiceCode>Ctrl+↑</NiceCode>, <NiceCode>Ctrl+↓</NiceCode> :
              Increase/decrease by 10
            </li>
            <li>
              <NiceCode>Ctrl+Enter</NiceCode> : Send
            </li>
          </ul>
        </div>
        <Dialog
          onClose={() => setState((v) => ({ ...v, shortcutListOpen: false }))}
          open={state.shortcutListOpen}
        >
          <DialogHeader
            onClose={() => setState((v) => ({ ...v, shortcutListOpen: false }))}
          >
            Shortcut list
          </DialogHeader>
          <DialogBody>
            <table className="border [&>:is(thead,tbody)>tr>:is(th,td)]:border [&>:is(thead,tbody)>tr>:is(th,td)]:px-2">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>When</th>
                  <th>Command ID</th>
                  <th>Args</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((shortcut) => (
                  <tr key={`${shortcut.commandId}-${shortcut.args}`}>
                    <td>
                      <code>{shortcut.key}</code>
                    </td>
                    <td>
                      <code>{shortcut.when}</code>
                    </td>
                    <td>
                      <code>{shortcut.commandId}</code>
                    </td>
                    <td>
                      <code>{JSON.stringify(shortcut.args)}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogBody>
        </Dialog>
      </VStack>
    </StraightLayout>
  );
}

SimpleActionDemoPage.path = "action/simple" as const;

function useDemoPageActions(
  state: PageState,
  setState: Dispatch<SetStateAction<PageState>>,
) {
  return useMemo(() => {
    const actions: Action[] = [
      {
        exec() {
          setState((prev) => ({
            ...prev,
            shortcutListOpen: !prev.shortcutListOpen,
          }));
        },
        id: "toggleShortcutListDialog",
        patterns: [
          {
            key: "?",
            // when: "!input", // TODO
          },
        ],
        title: "Toggle shortcut list dialog",
      },
      {
        id: "message",
        exec(message: string) {
          window.alert(`Message: ${message}`);
        },
        patterns: [
          {
            args: ["Hello world from UI 1!"],
            key: "Ctrl+Shift+M",
            when: "focus:ui1",
          },
          {
            args: ["Hi from UI 2!"],
            key: "Ctrl+Shift+M",
            when: "focus:ui2",
          },
        ],
        title: "Message",
      },
      {
        exec(selected: boolean) {
          setState((prev) => {
            return selected
              ? { ...prev, fruits: [...fruits] }
              : { ...prev, fruits: [] };
          });
        },
        id: "toggleAll",
        patterns: [
          {
            args: [true],
            key: "Ctrl+A",
            when: "focus:ui1",
          },
          {
            args: [false],
            key: "Ctrl+Shift+A",
            when: "focus:ui1",
          },
        ],
        title: "Select all fruits",
      },
      {
        id: "submitForm",
        exec() {
          window.alert(`Message: ${state.message}\n\nNumber: ${state.number}`);
          setState((prev) => ({ ...prev, message: "", number: 0 }));
        },
        patterns: [
          {
            key: "Ctrl+Enter",
            when: "focus:ui2",
          },
        ],
        title: "Submit form",
      },
      {
        exec(diff: number) {
          setState((prev) => {
            return { ...prev, number: prev.number + diff };
          });
        },
        id: "increaseNumber",
        patterns: [
          {
            args: [10],
            key: "Ctrl+ArrowUp",
            when: "focus:the-number",
          },
          {
            args: [-10],
            key: "Ctrl+ArrowDown",
            when: "focus:the-number",
          },
        ],
        title: "Increase number",
      },
    ];
    return breakActions(actions);
  }, [setState, state]);
}

function useDemoPageConditions(state: PageState) {
  const conditions: ConditionFunctionMap = {
    "focus:ui1": createConditionFunction("Demo page", "focus:ui1", () => {
      const elFocus = document.activeElement;
      if (!elFocus) {
        return false;
      }

      const el = elFocus.closest("[data-focus='ui1']");
      if (!el) {
        return false;
      }

      return true;
    }),
    "focus:ui2": createConditionFunction("Demo page", "focus:ui2", () => {
      const elFocus = document.activeElement;
      if (!elFocus) {
        return false;
      }

      const el = elFocus.closest("[data-focus='ui2']");
      if (!el) {
        return false;
      }

      return true;
    }),
    "focus:the-number": createConditionFunction(
      "Number input",
      "focus:the-number",
      () => {
        return (
          document.activeElement ===
          document.querySelector("[data-focus='the-number']")
        );
      },
    ),
  };

  return conditions;
}
