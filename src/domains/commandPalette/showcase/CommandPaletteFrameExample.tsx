import { useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceH2 } from "../../nice/NiceH";
import { CommandListEmptyItem } from "../CommandListEmptyItem";
import { CommandPaletteFrame } from "../CommandPaletteFrame";

export function CommandPaletteFrameExample() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = ["One", "Two", "Three"] as const;

  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((v) => v.toLowerCase().includes(input.toLowerCase()));
  }, [options, input]);

  return (
    <>
      <NiceH2>&lt;CommandPaletteFrame&gt;</NiceH2>
      <p>
        <NiceButton onClick={() => setVisible(true)}>Open</NiceButton>
      </p>
      <CommandPaletteFrame
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v}
        input={input}
        onInput={setInput}
        onSelect={(v) => {
          console.log(v);
          setVisible(false);
        }}
        open={visible}
        options={filteredOptions}
        renderEmptyItem={() => (
          <CommandListEmptyItem>No match</CommandListEmptyItem>
        )}
        renderItem={(v) => <>{v}</>}
      />
    </>
  );
}
