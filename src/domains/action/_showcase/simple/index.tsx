import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { HStack } from "../../../layout/HStask";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1, NiceH2 } from "../../../nice/NiceH";
import { NiceInput } from "../../../nice/NiceInput";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { Action, breakActions } from "../../Action";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../CommandDefinition";
import { ConditionFunctionMap, createConditionFunction } from "../../Condition";
import { KeyboardShortcut } from "../../KeyboardShortcut";
import { useKeyboardShortcuts2 } from "../../keyboardShortcutHooks";

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"] as const;

interface PageState {
  fruits: (typeof fruits)[number][];
  message: string;
  number: number;
}

export function SimpleActionDemoPage(): JSX.Element {
  const [state, setState] = useState<PageState>({
    fruits: ["Apple"],
    message: "",
    number: 0,
  });

  const [commands, shortcuts] = useDemoPageActions(state, setState);
  const conditions = useDemoPageConditions(state);
  useShortcutRunner(commands, shortcuts, conditions);

  const onSelectAllClick = () => {
    const command = pickCommandDefinition(commands, "selectAllFruits");
    command.exec();
  };

  const onUnselectAllClick = () => {
    const command = pickCommandDefinition(commands, "unselectAllFruits");
    command.exec();
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
    const command = pickCommandDefinition(commands, "submitForm");
    command.exec();
  };

  return (
    <StraightLayout title="Simple action demos">
      <VStack>
        <NiceH1>Simple action demos</NiceH1>
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
          setState((prev) => {
            const newFruits = [...fruits];
            return { ...prev, fruits: newFruits };
          });
        },
        id: "selectAllFruits",
        shortcuts: [
          {
            key: "Ctrl+A",
            when: "focus:ui1",
          },
        ],
        title: "Select all fruits",
      },
      {
        exec() {
          setState((prev) => {
            return { ...prev, fruits: [] };
          });
        },
        id: "unselectAllFruits",
        shortcuts: [
          {
            key: "Ctrl+Shift+A",
            when: "focus:ui1",
          },
        ],
        title: "Unselect all fruits",
      },
      {
        id: "submitForm",
        exec() {
          window.alert(`Message: ${state.message}\n\nNumber: ${state.number}`);
          setState((prev) => ({ ...prev, message: "", number: 0 }));
        },
        shortcuts: [
          {
            key: "Ctrl+Enter",
            when: "focus:ui2",
          },
        ],
        title: "Submit form",
      },
      {
        exec() {
          setState((prev) => {
            return { ...prev, number: prev.number + 10 };
          });
        },
        id: "increaseNumber",
        shortcuts: [
          {
            key: "Ctrl+ArrowUp",
            when: "focus:the-number",
          },
        ],
        title: "Increase number by 10",
      },
      {
        exec() {
          setState((prev) => {
            return { ...prev, number: prev.number - 10 };
          });
        },
        id: "decreaseNumber",
        shortcuts: [
          {
            key: "Ctrl+ArrowDown",
            when: "focus:the-number",
          },
        ],
        title: "Decrease number by 10",
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

// TODO extract
function useShortcutRunner(
  commands: CommandDefinition[],
  shortcuts: KeyboardShortcut[],
  conditions: ConditionFunctionMap,
) {
  useKeyboardShortcuts2(shortcuts, conditions, (commandId) => {
    const command = pickCommandDefinition(commands, commandId);
    command.exec();
  });
}
