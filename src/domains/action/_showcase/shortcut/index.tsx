import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { CommandByKeyboardExample } from "./CommandByKeyExample";
import { KeyboardShortcutHooksExample } from "./KeyboardShortcutHooksExample";

export function ActionShortcutDemoPage(): JSX.Element {
  return (
    <StraightLayout title="Shortcut demos">
      <VStack>
        <NiceH1>
          <NiceCode>useKeyboardShortcuts()</NiceCode>
        </NiceH1>
        <KeyboardShortcutHooksExample />
        <NiceH1>Command by keyboard</NiceH1>
        <CommandByKeyboardExample />
      </VStack>
    </StraightLayout>
  );
}

ActionShortcutDemoPage.path = "action/shortcut" as const;
