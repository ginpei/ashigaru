import { useMemo, useState } from "react";
import { NiceButton } from "../../nice/NiceButton";
import { NiceCode } from "../../nice/NiceCode";
import { NiceCodeBlock } from "../../nice/NiceCodeBlock";
import { NiceSection } from "../../nice/NiceSection";
import { tick } from "../../time/timeManipulator";
import { CommandListEmptyItem } from "../CommandListEmptyItem";
import { CommandPaletteFrame } from "../CommandPaletteFrame";
import { HighlightedTitle } from "../HighlightedTitle";
import { Highlighted, highlightFilteredCommandTitle } from "../commandFilter";

type DemoOption = FileOption | CommandOption | LineOption;

interface DemoOptionBase {
  id: string;
  label: string;
}

type HighlightedDemoOption = Highlighted<{ data: DemoOption }>;

interface FileOption extends DemoOptionBase {
  dir: string;
}

interface CommandOption extends DemoOptionBase {
  exec: () => void;
}

interface LineOption extends DemoOptionBase {
  line: number;
}

const modes = ["file", "command", "line"] as const;
type Mode = (typeof modes)[number];
const modePrefixMap: Readonly<Record<string, Mode>> = {
  ":": "line",
  ">": "command",
};

const files: readonly FileOption[] = [
  { id: "file-1", label: "one.txt", dir: "/home/you/docs/" },
  { id: "file-2", label: "two.txt", dir: "/home/you/docs/" },
  { id: "file-3", label: "three.md", dir: "/home/you/assets/images/" },
];

const commands: readonly CommandOption[] = [
  {
    id: "command-1",
    label: "Open...",
    exec() {
      window.prompt("Input file path", "/home/you/docs/");
    },
  },
  {
    id: "command-2",
    label: "Save",
    exec() {
      window.alert("File saved.");
    },
  },
  {
    id: "command-3",
    label: "Close",
    exec() {
      window.confirm("Are you sure to close?");
    },
  },
];

export function CommandPaletteModeExample() {
  return (
    <NiceSection heading="Command palette mode" level="2">
      <p>You can switch options by input.</p>
      <p>
        (Find the implementation example in this file{" "}
        <NiceCode>CommandPaletteModeExample.tsx</NiceCode>.)
      </p>
      <Demo />
    </NiceSection>
  );
}

function Demo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  const [filteredOptions, mode] = useFilteredOptions(input);

  const onOpenClick = () => {
    setInput("");
    setVisible(true);
  };

  const onSelect = (result: HighlightedDemoOption | null) => {
    const data = result?.data;
    if (data) {
      if ("dir" in data) {
        setResult(data.label);
      } else if ("exec" in data) {
        setResult("");
        tick().then(() => {
          data.exec();
          setResult(`Command "${data.label}" executed`);
        });
      } else if ("line" in data) {
        setResult(`Jumped to the line ${data.line}`);
      }
    } else {
      setResult(undefined);
    }

    setVisible(false);
  };

  return (
    <>
      <ul className="ui-ul">
        <li>
          <NiceCode>foo</NiceCode> - File &quot;foo&quot;
        </li>
        <li>
          <NiceCode>&gt;foo</NiceCode> - Command &quot;foo&quot;
        </li>
        <li>
          <NiceCode>:123</NiceCode> - Jump to line 123
        </li>
      </ul>
      <p>
        <NiceButton onClick={() => onOpenClick()}>Open</NiceButton>
      </p>
      <p>Result: {result ?? "(N/A)"}</p>
      <CommandPaletteFrame
        emptyMessage={
          mode === "line" ? (
            <CommandListEmptyItem>Input a number to jump</CommandListEmptyItem>
          ) : (
            "No match"
          )
        }
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v.data.id}
        input={input}
        onInput={setInput}
        onSelect={onSelect}
        open={visible}
        options={filteredOptions}
        renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
      />
    </>
  );
}

function useFilteredOptions(input: string): [HighlightedDemoOption[], Mode] {
  const mode: Mode = modePrefixMap[input[0]] ?? "file";

  const filteredOptions = useMemo(() => {
    if (mode === "line") {
      const sLine = input.slice(1);
      const line = Number.parseInt(sLine, 10);
      if (sLine === "" || Number.isNaN(line) || line < 1) {
        return [];
      }

      const label = `Jump to the line ${line}`;
      const data = { id: "", label: label };
      const chars = highlightFilteredCommandTitle(label, sLine);
      if (!chars) {
        // Infinity
        return [];
      }

      const option: Highlighted<{ data: LineOption }> = {
        data: {
          ...data,
          line,
        },
        highlightedCharacters: chars,
      };
      return [option];
    }

    if (mode === "command") {
      const result: Highlighted<{ data: CommandOption }>[] = [];
      const commandName = input.slice(1);

      for (const option of commands) {
        const chars = highlightFilteredCommandTitle(option.label, commandName);
        if (chars) {
          result.push({
            highlightedCharacters: chars,
            data: option,
          });
        }
      }

      return result;
    }

    const result: Highlighted<{ data: FileOption; type: "dir" | "file" }>[] =
      [];

    for (const option of files) {
      const label = highlightFilteredCommandTitle(option.label, input);
      if (label) {
        result.push({
          data: option,
          highlightedCharacters: label,
          type: "file",
        });

        continue;
      }

      const dir = highlightFilteredCommandTitle(option.dir, input);
      if (dir) {
        result.push({
          data: option,
          highlightedCharacters: dir,
          type: "dir",
        });
      }
    }

    return result;
  }, [input, mode]);

  return [filteredOptions, mode];
}
