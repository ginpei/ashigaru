import { useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceCode } from "../../nice/NiceCode";
import { NiceCodeBlock } from "../../nice/NiceCodeBlock";
import { NiceSection } from "../../nice/NiceSection";
import { CommandPaletteFrame } from "../CommandPaletteFrame";
import { HighlightedTitle } from "../HighlightedTitle";
import { Highlighted, highlightFilteredCommandTitle } from "../commandFilter";

interface DemoOption {
  id: string;
  label: string;
}

const originalOptions: readonly DemoOption[] = [
  { id: "1", label: "One" },
  { id: "2", label: "Two" },
  { id: "3", label: "Three" },
];

export function CommandPaletteFrameExample() {
  return (
    <NiceSection heading="&lt;CommandPaletteFrame&gt;" level="2">
      <NiceSection heading="Example" level="3">
        <Demo />
      </NiceSection>
      <NiceSection heading="Usage" level="3">
        <NiceCodeBlock>{`
<CommandPaletteFrame
  emptyMessage="No match"
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
        <p>
          Instead of giving all props like the above, it would be a good idea to
          create a wrapper component for each actual usage.
        </p>
        <NiceCodeBlock>{`
<MyCommandPalette
  onSelect={onSelect}
  options={originalOptions}
/>
        `}</NiceCodeBlock>
        <p>
          See another section for the example of your{" "}
          <NiceCode>{`<MyCommandPalette>`}</NiceCode>.
        </p>
      </NiceSection>
      <NiceSection heading="Data" level="3">
        <p>
          Although any data type is acceptable, it would be a great idea to make
          it an object that has an unique ID.
        </p>
        <p>
          You have to provide a function to <NiceCode>getKey</NiceCode> prop
          along with the <NiceCode>options</NiceCode> prop.
        </p>
        <NiceCodeBlock>{`
interface DemoOption {
  id: string;
  label: string;
}

const originalOptions: readonly DemoOption[] = [
  { id: "1", label: "One" },
  { id: "2", label: "Two" },
  { id: "3", label: "Three" },
];
        `}</NiceCodeBlock>
        <NiceCodeBlock>{`
<CommandPaletteFrame
  options={originalOptions}
  getKey={(v) => v.id}
  ...
/>
        `}</NiceCodeBlock>
      </NiceSection>
      <NiceSection heading="Input" level="3">
        <p>
          User input is managed on the caller side in order to keep the
          component stateless.
        </p>
        <NiceCodeBlock>{`
const [input, setInput] = useState("");
        `}</NiceCodeBlock>
        <NiceCodeBlock>{`
<CommandPaletteFrame
  input={input}
  onInput={setInput}
  ...
/>
        `}</NiceCodeBlock>
      </NiceSection>
      <NiceSection heading="Filtering" level="3">
        <p>Filtering by input is a responsibility on the caller side too.</p>
        <NiceCodeBlock>{`
const filteredOptions = useMemo(
  () => originalOptions.filter((v) => v.includes(input)),
  [input]
);
        `}</NiceCodeBlock>
        <NiceCodeBlock>{`
<CommandPaletteFrame
  emptyMessage="No match"
  options={filteredOptions}
  renderItem={(v) => <div>v</div>}
  ...
/>
        `}</NiceCodeBlock>
        <p>
          You can give the <NiceCode>filteredOptions</NiceCode> to the{" "}
          <NiceCode>options</NiceCode> prop, and render by{" "}
          <NiceCode>{`renderItem`}</NiceCode> prop. It receives a function that
          returns a React node.
        </p>
        <p>
          When the filtered options becomes empty, it shows the message you gave
          to <NiceCode>emptyMessage</NiceCode> prop. You can give a string, or a
          React component.
        </p>
      </NiceSection>
      <NiceSection heading="Highlight" level="3">
        <p>
          You can highlight option labels to emphasize parts that match the
          input. Here are some tools:
        </p>
        <ul className="ui-ul">
          <li>
            <NiceCode>highlightFilteredCommandTitle()</NiceCode> - function to
            highlight characters, that also returns <NiceCode>null</NiceCode> if
            nothing matches.
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
  const result: Highlighted<{ data: DemoOption }>[] = [];
  for (const option of originalOptions) {
    // it returns \`null\` if it doesn't match with input
    const chars = highlightFilteredCommandTitle(option.label, input);
    if (chars) {
      result.push({
        highlightedCharacters: chars,
        data: option,
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
      </NiceSection>
      <NiceSection heading="Open/close and result" level="3">
        <p>
          Open/close state is managed by <NiceCode>open</NiceCode> prop. When
          user selected an option, or closed without selecting, the callback
          given to the <NiceCode>onSelect</NiceCode> prop is called.
        </p>
        <NiceCodeBlock>{`
const [result, setResult] = useState<DemoOption | null>(null);
const [visible, setVisible] = useState(false);
        `}</NiceCodeBlock>
        <NiceCodeBlock>{`
<button onClick={() => setVisible(true)}>Open</button>

<CommandPaletteFrame
  onSelect={(value) => {
    setResult(value?.data ?? null);
    setVisible(false);
  }}
  open={visible}
  ...
/>
        `}</NiceCodeBlock>
      </NiceSection>
      <NiceSection heading="Relating modules" level="3">
        <p>Recap:</p>
        <ul className="ui-ul">
          <li>
            <NiceCode>{`<CommandPaletteFrame>`}</NiceCode> - Outer component.
            You should create your own wrapper component
          </li>
          <li>
            <NiceCode>highlightFilteredCommandTitle()</NiceCode> - A function to
            make your option label highlighted
          </li>
          <li>
            <NiceCode>{`<HighlightedTitle>`}</NiceCode> - Option title
            emphasized by filter. You may want to have your wrapper component
          </li>
        </ul>
        <p>And something this section did not refer:</p>
        <ul className="ui-ul">
          <li>
            <NiceCode>{`Highlighted<T>`}</NiceCode> - A type that{" "}
            <NiceCode>highlightFilteredCommandTitle()</NiceCode> returns
          </li>
          <li>
            <NiceCode>{`<CommandListEmptyItem>`}</NiceCode> - Used for{" "}
            <NiceCode>emptyMessage</NiceCode> prop internally to render when no
            match (empty option list is given). You can give it a function that
            returns your own component
          </li>
        </ul>
      </NiceSection>
    </NiceSection>
  );
}

function Demo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<DemoOption | null>(null);
  const [visible, setVisible] = useState(false);

  const filteredOptions = useMemo(() => {
    const result: Highlighted<{ data: DemoOption }>[] = [];
    for (const option of originalOptions) {
      // it returns `null` if it doesn't match with input
      const chars = highlightFilteredCommandTitle(option.label, input);
      if (chars) {
        result.push({
          highlightedCharacters: chars,
          data: option,
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
    <>
      <p>
        <NiceButton onClick={() => openPalette()}>Open</NiceButton> (No hot keys
        available)
      </p>
      <p>Result: {result?.label ?? "(N/A)"}</p>
      <CommandPaletteFrame
        emptyMessage="No match"
        getKey={(v) => v.data.id}
        input={input}
        onInput={setInput}
        onSelect={(value) => {
          setResult(value?.data ?? null);
          setVisible(false);
        }}
        open={visible}
        options={filteredOptions}
        renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
      />
    </>
  );
}
