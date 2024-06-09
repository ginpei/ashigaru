import { useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceCode } from "../../nice/NiceCode";
import { NiceCodeBlock } from "../../nice/NiceCodeBlock";
import { NiceH2, NiceH3 } from "../../nice/NiceH";
import { NiceSection } from "../../nice/NiceSection";
import { CommandPaletteFrame } from "../CommandPaletteFrame";
import { HighlightedTitle } from "../HighlightedTitle";
import { Highlighted, highlightFilteredCommandTitle } from "../commandFilter";

const options = ["One", "Two", "Three"] as const;

export function CommandPaletteFrameExample() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
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
  }, [input]);

  const openPalette = () => {
    setInput("");
    setVisible(true);
  };

  return (
    <NiceSection heading="&lt;CommandPaletteFrame&gt;" level="2">
      <NiceSection heading="Example" level="3">
        <p>
          <NiceButton onClick={() => openPalette()}>Open</NiceButton>
        </p>
        <p>Result: {result}</p>
      </NiceSection>
      <NiceSection heading="Usage" level="3">
        <NiceCodeBlock>{`
<CommandPaletteFrame
  emptyMessage="No match"
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
  renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
/>
        `}</NiceCodeBlock>
        <p>Filtering by input is a responsibility on the caller side.</p>
        <NiceCodeBlock>{`
const allOptions = ["One", "Two", "Three"];
const filteredOptions = useMemo(
  () => allOptions.filter((v) => v.includes(input)),
  [input]
);
        `}</NiceCodeBlock>
        <p>
          <NiceCode>renderItem</NiceCode> prop receives a function that returns
          a React node. You can use highlighted values to emphasize the part of
          option title that matches the input.
        </p>
        <ul className="ui-ul">
          <li>
            <NiceCode>{`Highlighted<T>`}</NiceCode> - type to support
            highlighting
          </li>
          <li>
            <NiceCode>highlightFilteredCommandTitle()</NiceCode> - function to
            highlight characters
          </li>
          <li>
            <NiceCode>{`renderItem={}`}</NiceCode> - prop to render each item
          </li>
          <li>
            <NiceCode>{`<HighlightedTitle>`}</NiceCode> - render a highlighted
            option title
          </li>
        </ul>
        <NiceCodeBlock>{`
type MyValue = { title: string };
type MyValueHighlighted = Highlighted<MyValue>;

const filteredOptions = useMemo(() => {
  const result: MyValueHighlighted[] = [];
  for (const title of allOptions) {
    const chars = highlightFilteredCommandTitle(title, input);
    if (chars) {
      result.push({
        highlightedCharacters: chars,
        title,
      });
    }
  }
  return result;
}, [input]);
        `}</NiceCodeBlock>
        <NiceCodeBlock>{`
<CommandPaletteFrame
  options={filteredOptions}
  renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
  ...
/>
        `}</NiceCodeBlock>
        <p>
          Instead of giving all props like the above, it would be a good idea to
          create a wrapper component for each actual usage.
        </p>
        <NiceCodeBlock>{`
<MyCommandPalette
  onSelect={onSelect}
  options={filteredOptions}
/>
        `}</NiceCodeBlock>
      </NiceSection>
      <NiceSection heading="Relating components" level="3">
        <ul className="ui-ul">
          <li>
            <NiceCode>{`<CommandPaletteFrame>`}</NiceCode> - Outer component.
            You should create your own wrapper component
          </li>
          <li>
            <NiceCode>{`<HighlightedTitle>`}</NiceCode> - Option title
            emphasized by filter. You may want to have your wrapper component
          </li>
          <li>
            <NiceCode>{`<CommandListEmptyItem>`}</NiceCode> - Used for{" "}
            <NiceCode>emptyMessage</NiceCode> prop internally to render when no
            match (empty option list is given). You can give it a function that
            returns your own component
          </li>
        </ul>
      </NiceSection>
      <CommandPaletteFrame
        emptyMessage="No match"
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v.title}
        input={input}
        onInput={setInput}
        onSelect={(value) => {
          setResult(value?.title ?? "(N/A)");
          setVisible(false);
        }}
        open={visible}
        options={filteredOptions}
        renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
      />
    </NiceSection>
  );
}
