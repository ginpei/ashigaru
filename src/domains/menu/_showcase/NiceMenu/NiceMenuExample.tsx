import { useRef, useState } from "react";
import { NiceMenu } from "../../NiceMenu";

export interface NiceMenuExampleProps {}

export function NiceMenuExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const refButton = useRef<HTMLButtonElement>(null);

  return (
    <div className="NiceMenuExample">
      <textarea className="resize" disabled></textarea>
      <NiceMenu>
        <NiceMenu.Button>Hi</NiceMenu.Button>
        <NiceMenu.Items className="absolute flex flex-col border bg-white shadow-lg">
          <NiceMenu.Item href="#demo-link">Demo link</NiceMenu.Item>
          <NiceMenu.Item onClick={() => console.log(`# click`)}>
            Documentation
          </NiceMenu.Item>
          <NiceMenu.Item disabled>Invite a friend (coming soon!)</NiceMenu.Item>
        </NiceMenu.Items>
      </NiceMenu>
    </div>
  );
}
