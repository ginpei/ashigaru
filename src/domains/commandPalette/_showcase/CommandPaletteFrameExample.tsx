import { useEffect, useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceH2 } from "../../nice/NiceH";
import { Highlighted, highlightFilteredCommandTitle } from "../commandFilter";
import { CommandListEmptyItem } from "../CommandListEmptyItem";
import { CommandPaletteFrame } from "../CommandPaletteFrame";
import { HighlightedTitle } from "../HighlightedTitle";

export function CommandPaletteFrameExample() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = ["One", "Two", "Three"] as const;

  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const filteredOptions = useMemo(() => {
    const result: Highlighted<{ title: string }>[] = [];
    for (const title of options) {
      const chars = highlightFilteredCommandTitle(title, input);
      if (chars) {
        result.push({
          highlightedCharacters: chars,
          title,
        });
      }
    }
    return result;
  }, [options, input]);

  useEffect(() => {
    if (visible) {
      setInput("");
    }
  }, [visible]);

  return (
    <>
      <NiceH2>&lt;CommandPaletteFrame&gt;</NiceH2>
      <p>
        <NiceButton onClick={() => setVisible(true)}>Open</NiceButton>
      </p>
      <CommandPaletteFrame
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v.title}
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
        renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
      />
    </>
  );
}
