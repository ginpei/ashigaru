import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceCodeBlock } from "../../../nice/NiceCodeBlock";
import { NiceH1, NiceH2 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";

export function ActionAboutActionDemoPage(): JSX.Element {
  return (
    <StraightLayout title="About action">
      <VStack>
        <NiceH1>About action</NiceH1>
        <p>
          <a
            className="block hover:bg-slate-50"
            href="https://mermaid.live/edit#pako:eNqNU0FOwzAQ_ErkE0gNB45WFQm1ICHEqZwgHLb2prXS2JFjV0RV_44dpwTSuNSHyJ7MzM6u7ANhiiOhpDFgcClgo6FK9_e5TNzqwGStEcoHZoSSzc1tMp8XSpdZFigB__hM0jQbMenoHAQjNy9bqKoCyZslFkKK4Bclr7ZKG2aNp_xOyRzV4EJJ3jk8WdnJzgLHeSHKCH-FmsY1fyPUgpWneEMvZwmGDrqSMVUgTwW6QvaC7VqB5o97lKbjl9hS_xngN_Usa2v66Z-UjnKFf7RVL236H_SCyXhufYoLY5u6JT9JJ-R9hb76_8xYCi9kAb_DL2T-YkeNyIxUqCsQ3L2pgzfOidlihTmhbsuxALszOcnl0VHBGrVqJSPUaIszYms-vEJCC9g1Dq1Bvit1Oh-_AWBqRvY"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="mx-auto max-w-96"
              src="https://mermaid.ink/svg/pako:eNqNU0FOwzAQ_ErkE0gNB45WFQm1ICHEqZwgHLb2prXS2JFjV0RV_44dpwTSuNSHyJ7MzM6u7ANhiiOhpDFgcClgo6FK9_e5TNzqwGStEcoHZoSSzc1tMp8XSpdZFigB__hM0jQbMenoHAQjNy9bqKoCyZslFkKK4Bclr7ZKG2aNp_xOyRzV4EJJ3jk8WdnJzgLHeSHKCH-FmsY1fyPUgpWneEMvZwmGDrqSMVUgTwW6QvaC7VqB5o97lKbjl9hS_xngN_Usa2v66Z-UjnKFf7RVL236H_SCyXhufYoLY5u6JT9JJ-R9hb76_8xYCi9kAb_DL2T-YkeNyIxUqCsQ3L2pgzfOidlihTmhbsuxALszOcnl0VHBGrVqJSPUaIszYms-vEJCC9g1Dq1Bvit1Oh-_AWBqRvY"
            />
          </a>
        </p>
        <NiceH2>Prepare actions</NiceH2>
        <ol className="ui-ol">
          <li>
            Define actions, which type is <NiceCode>Action</NiceCode>
          </li>
          <li>
            Break down the actions into commands and shortcuts using{" "}
            <NiceCode>breakActions()</NiceCode>, which returns{" "}
            <NiceCode>[CommandDefinition[], KeyboardShortcut[]]</NiceCode>
          </li>
        </ol>
        <NiceCodeBlock>
          {`
const actions: Action[] = [
  {
    exec(args) {
      console.log("executed", args);
    },
    id: "action1",
    shortcuts: [
      {
        args: [1, 2],
        key: "Ctrl+X",
        when: "focus:canvas",
      },
    ],
    title: "An example action",
  },
];

const [commands, shortcuts] = breakActions(actions);
        `}
        </NiceCodeBlock>
        <NiceH2>Prepare conditions</NiceH2>
        <p>
          Condition is used to determine which keyboard shortcut is available in
          a certain situation.
        </p>
        <ol className="ui-ol">
          <li>
            Implement a condition map, which type is{" "}
            <NiceCode>ConditionFunctionMap</NiceCode>, using{" "}
            <NiceCode>createConditionFunction()</NiceCode>
          </li>
        </ol>
        <NiceCodeBlock>
          {`
const conditions: ConditionFunctionMap = {
  "focus:canvas": createConditionFunction("", "focus:canvas", () => true),
};
        `}
        </NiceCodeBlock>
        <NiceH2>Run a command by ID</NiceH2>
        <ol className="ui-ol">
          <li>
            Pick a command by an ID using{" "}
            <NiceCode>pickCommandDefinition()</NiceCode>
          </li>
          <li>
            Run the command using <NiceCode>command.exec()</NiceCode>
          </li>
        </ol>
        <NiceCodeBlock>
          {`
const command = pickCommandDefinition(commands, "action1");
command.exec();
        `}
        </NiceCodeBlock>
        <NiceH2>Run a command by keyboard shortcut</NiceH2>
        <ol className="ui-ol">
          <li>
            Observe user keyboard input events, and get a keyboard input key
            (e.g. <NiceCode>&quot;Ctrl+Shift+X&quot;</NiceCode>) from the event
            using <NiceCode>keyboardEventToInputCommand()</NiceCode>
          </li>
          <li>
            Pick a shortcut by input key combination and conditions using{" "}
            <NiceCode>pickShortcutDefinition()</NiceCode>
          </li>
          <li>
            Pick a command by an command ID on the shortcut using{" "}
            <NiceCode>pickCommandDefinition()</NiceCode>
          </li>
          <li>
            Run the command using <NiceCode>command.exec()</NiceCode>
          </li>
        </ol>
        <NiceCodeBlock>
          {`
const key = keyboardEventToInputCommand(keyboardEvent);

const conditions: ConditionFunctionMap = {
  "focus:canvas": createConditionFunction("", "focus:canvas", () => true),
};

const shortcut = pickShortcutDefinition(shortcuts, conditions, key);
const command = pickCommandDefinition(commands, shortcut.commandId);
command.exec(...(shortcut.args ?? []));
        `}
        </NiceCodeBlock>
      </VStack>
    </StraightLayout>
  );
}

ActionAboutActionDemoPage.path = "action/aboutAction" as const;
