import { VStack } from "../../layout/VStack";
import { NiceH1 } from "../../nice/NiceH";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { KeyboardShortcutHooksExample } from "./KeyboardShortcutHooksExample";

export function ShortcutIndex(): JSX.Element {
  return (
    <StraightLayout title="Shortcut demos">
      <VStack>
        <NiceH1>
          <code>useKeyboardShortcuts()</code>
        </NiceH1>
        <KeyboardShortcutHooksExample />
      </VStack>
    </StraightLayout>
  );
}

ShortcutIndex.path = "shortcut/index" as const;
