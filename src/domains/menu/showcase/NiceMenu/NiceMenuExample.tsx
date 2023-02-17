import { useRef, useState } from "react";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceMenu } from "../../NiceMenu";

export interface NiceMenuExampleProps {}

export function NiceMenuExample(): JSX.Element {
  const [open, setOpen] = useState(false);

  const refButton = useRef<HTMLButtonElement>(null);

  return (
    <div className="NiceMenuExample">
      <textarea className="resize" disabled></textarea>
      <NiceButton onClick={() => setOpen((v) => !v)} ref={refButton}>
        Hi
      </NiceButton>
      <NiceMenu
        elRef={refButton.current}
        onBlur={() => setOpen(false)}
        open={open}
      />
    </div>
  );
}
