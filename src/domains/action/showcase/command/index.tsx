import { VStack } from "../../../layout/VStack";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { CommandExample } from "./CommandExample";

export function CommandIndex(): JSX.Element {
  return (
    <StraightLayout title="Command demos">
      <VStack>
        <NiceH1>Command examples</NiceH1>
        <CommandExample />
      </VStack>
    </StraightLayout>
  );
}

CommandIndex.path = "action/command" as const;
