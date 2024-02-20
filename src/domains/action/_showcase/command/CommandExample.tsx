import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { CommandDefinition } from "../../CommandDefinition";

const commands: CommandDefinition[] = [
  {
    exec() {
      console.log("Command 1 was invoked");
    },
    id: "command1",
    title: "Command 1",
  },
];

export function CommandExample(): JSX.Element {
  return (
    <VStack className="CommandExample">
      <p>Define commands:</p>
      <pre className="bg-slate-100 p-2 text-xs">
        {`const commands: CommandDefinition[] = [
  {
    exec() {
      console.log("Command 1 was invoked");
    },
    id: "command1",
    title: "Command 1",
  },
];`}
      </pre>
    </VStack>
  );
}
