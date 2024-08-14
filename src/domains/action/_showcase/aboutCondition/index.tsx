import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceCodeBlock } from "../../../nice/NiceCodeBlock";
import { NiceH1, NiceH2 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";

export function ActionAboutConditionDemoPage(): React.JSX.Element {
  return (
    <StraightLayout title="About condition">
      <VStack>
        <NiceH1>About condition (WIP)</NiceH1>
        <NiceH2>Overview</NiceH2>
        <p>
          Availability of commands depends on situation. For example,{" "}
          <NiceCode>Ctrl+A</NiceCode> selects all text in a text area, but it
          can select all elements in a canvas when the canvas is focused.
        </p>
        <p>
          Condition mechanism provides a way to determine which keyboard
          shortcut is available in a certain situation.
        </p>
        <NiceH2>Prepare conditions</NiceH2>
        <ol className="ui-ol">
          <li>
            Define conditions, which type is <NiceCode>Condition</NiceCode>{" "}
            (WIP)
          </li>
          <li>
            Convert an array of <NiceCode>Condition</NiceCode> to a map by{" "}
            <NiceCode>convertConditionArrayToMap()</NiceCode> (WIP)
          </li>
        </ol>
        <NiceCodeBlock>
          {
            /* ts */ `
const conditionDefs: Condition[] = [
  {
    key: "focus:canvas",
    fn: () => document.activeElement?.classList.contains("canvas") ?? false,
  },
];

const conditionMap = convertConditionArrayToMap(conditionDefs);
        `
          }
        </NiceCodeBlock>
        <NiceH2>Use condition</NiceH2>
        <p>
          You can give condition expression to <NiceCode>when</NiceCode> on an
          action pattern.
        </p>
        <NiceCodeBlock>
          {
            /* ts */ `
const actions: Action[] = [
  {
    exec(args) { … },
    id: "list:selectAll",
    patterns: [
      { keyboard: "Ctrl+A", when: "focus:list", },
    ],
  },
  {
    exec(args) { … },
    id: "canvas:selectAll",
    patterns: [
      { keyboard: "Ctrl+A", when: "canvas:hasFocus && !canvas:readOnly", },
    ],
  },
];

const [commands, shortcuts] = breakActions(actions);
            `
          }
        </NiceCodeBlock>
        <NiceH2>Condition key</NiceH2>
        <p>
          Condition key is an expression that represents a situation. Here are
          some examples:
        </p>
        <ul className="ui-ul">
          <li>
            <NiceCode>isOK</NiceCode> - a function named &quot;isOK&quot; that
            returns boolean
          </li>
          <li>
            <NiceCode>is_ok</NiceCode>, <NiceCode>is:ok</NiceCode> - function
            name can contain underscore or colon
          </li>
          <li>
            <NiceCode>foo:11,22</NiceCode> - a function named &quot;foo&quot;
            with arguments &quot;11&quot; and &quot;22&quot;
          </li>
          <li>
            <NiceCode>!bar</NiceCode> - a function but boolean negated
          </li>
          <li>
            <NiceCode>foo && bar</NiceCode> - a logical AND operation
          </li>
          <li>
            <NiceCode>foo || bar</NiceCode> - a logical OR operation
          </li>
        </ul>
        <NiceH2>Pick shortcut and run command</NiceH2>
        <NiceCodeBlock>
          {
            /* ts */ `
const input = "Ctrl+A";
const shortcut = findShortcut(shortcuts, input, conditions);
if (shortcut) {
  execCommand(commands, shortcut.commandId, shortcut.args);
}
        `
          }
        </NiceCodeBlock>
        <NiceH2>React</NiceH2>
        <p>
          Set up keyboard listener to run commands by{" "}
          <NiceCode>useShortcutRunner()</NiceCode>.
        </p>
        <NiceCodeBlock>
          {
            /* ts */ `
useShortcutRunner(commands, shortcuts, conditions);
          `
          }
        </NiceCodeBlock>
      </VStack>
    </StraightLayout>
  );
}

ActionAboutConditionDemoPage.path = "action/aboutCondition" as const;
