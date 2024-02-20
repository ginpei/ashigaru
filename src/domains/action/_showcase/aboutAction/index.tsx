import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";

export function ActionAboutActionDemoPage(): JSX.Element {
  return (
    <StraightLayout title="About action">
      <VStack>
        <NiceH1>About action</NiceH1>
        <ul className="ui-ul">
          <li>
            <NiceCode>CommandDefinition</NiceCode> - Command ID, function, etc.
          </li>
          <li>
            <NiceCode>KeyboardShortcut</NiceCode> - Key combination, command ID
            to invoke, etc.
          </li>
          <li>
            <NiceCode>Action</NiceCode> - <NiceCode>CommandDefinition</NiceCode>{" "}
            + list of default <NiceCode>KeyboardShortcut</NiceCode>
          </li>
          <li>
            Use <NiceCode>buildActions()</NiceCode> to build{" "}
            <NiceCode>CommandDefinition</NiceCode> and
            <NiceCode>KeyboardShortcut</NiceCode> from{" "}
            <NiceCode>Action</NiceCode>
          </li>
        </ul>
      </VStack>
    </StraightLayout>
  );
}

ActionAboutActionDemoPage.path = "action/aboutAction" as const;
