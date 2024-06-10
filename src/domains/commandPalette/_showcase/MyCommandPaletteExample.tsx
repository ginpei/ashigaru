import { useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceCodeBlock } from "../../nice/NiceCodeBlock";
import { NiceDetails } from "../../nice/NiceDetails";
import { NiceSection } from "../../nice/NiceSection";
import { CommandPaletteFrame } from "../CommandPaletteFrame";
import { HighlightedTitle } from "../HighlightedTitle";
import { Highlighted, highlightFilteredCommandTitle } from "../commandFilter";

interface MyCommandOption {
  description?: string;
  icon: string;
  id: string;
  title: string;
}

const myOptions: MyCommandOption[] = [
  {
    icon: "🍎",
    id: "apple",
    title: "Apple",
    description: "Apple is an American computer and consumer electronics",
  },
  { icon: "🍌", id: "banana", title: "Banana" },
  { icon: "🍒", id: "cherry", title: "Cherry" },
  { icon: "🍇", id: "grape", title: "Grape", description: "Grape is a fruit" },
  { icon: "🍊", id: "orange", title: "Orange" },
];

export function MyCommandPaletteExample(): JSX.Element {
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [result, setResult] = useState<MyCommandOption | null>(null);

  const onSelect = (option: MyCommandOption | null) => {
    setResult(option);
    setPaletteVisible(false);
  };

  return (
    <NiceSection heading={`"MyCommandPalette" example`} level="2">
      <NiceSection heading="Example" level="3">
        <NiceDetails summary="Code">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            eum, quidem distinctio adipisci necessitatibus porro rerum
            accusantium nobis nostrum quibusdam nulla? Et vitae nulla architecto
            est laudantium veritatis laboriosam. Veniam.
          </p>
          <NiceCodeBlock>{`
function MyCommandPalette({
  onSelect,
  options,
}: {
  onSelect: (option: MyCommandOption | null) => void;
  options: MyCommandOption[];
}): JSX.Element {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    const result: Highlighted<MyCommandOption>[] = [];
    for (const option of options) {
      const chars = highlightFilteredCommandTitle(option.title, input);
      if (chars) {
        result.push({
          ...option,
          highlightedCharacters: chars,
        });
      }
    }
    return result;
  }, [input, options]);

  const onItemSelect = (option: MyCommandOption | null) => {
    onSelect(option);
  };

  return (
    <CommandPaletteFrame<Highlighted<MyCommandOption>>
      emptyMessage="No item matches"
      focusTargetId="myCommandPaletteFocus"
      getKey={(v) => v.id}
      input={input}
      onInput={setInput}
      onSelect={onItemSelect}
      open={true}
      options={filteredOptions}
      renderItem={(v) => (
        <div className="flex gap-4">
          <span className="inline-grid size-4 place-items-center">
            {v.icon}
          </span>
          <span className="flex flex-col gap-1">
            <HighlightedTitle chars={v.highlightedCharacters} />
            {v.description && (
              <div className="text-xs text-gray-500">{v.description}</div>
            )}
          </span>
        </div>
      )}
    />
  );
}
          `}</NiceCodeBlock>
        </NiceDetails>
        <p>
          <NiceButton onClick={() => setPaletteVisible(true)}>
            Open command palette
          </NiceButton>
        </p>
        <p>
          Result:{" "}
          {result ? (
            <>
              {result.icon} {result.title}
            </>
          ) : (
            "N/A"
          )}
        </p>
        {paletteVisible && (
          <MyCommandPalette onSelect={onSelect} options={myOptions} />
        )}
      </NiceSection>
    </NiceSection>
  );
}

function MyCommandPalette({
  onSelect,
  options,
}: {
  onSelect: (option: MyCommandOption | null) => void;
  options: MyCommandOption[];
}): JSX.Element {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    const result: Highlighted<MyCommandOption>[] = [];
    for (const option of options) {
      const chars = highlightFilteredCommandTitle(option.title, input);
      if (chars) {
        result.push({
          ...option,
          highlightedCharacters: chars,
        });
      }
    }
    return result;
  }, [input, options]);

  const onItemSelect = (option: MyCommandOption | null) => {
    onSelect(option);
  };

  return (
    <CommandPaletteFrame<Highlighted<MyCommandOption>>
      emptyMessage="No item matches"
      focusTargetId="myCommandPaletteFocus"
      getKey={(v) => v.id}
      input={input}
      onInput={setInput}
      onSelect={onItemSelect}
      open={true}
      options={filteredOptions}
      renderItem={(v) => (
        <div className="flex gap-4">
          <span className="inline-grid size-4 place-items-center">
            {v.icon}
          </span>
          <span className="flex flex-col gap-1">
            <HighlightedTitle chars={v.highlightedCharacters} />
            {v.description && (
              <div className="text-xs text-gray-500">{v.description}</div>
            )}
          </span>
        </div>
      )}
    />
  );
}
