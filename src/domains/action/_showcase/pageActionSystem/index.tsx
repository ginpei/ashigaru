import { FormEventHandler, useMemo, useState } from "react";
import {
  CommandPaletteFrame,
  CommandPaletteOption,
  CommandPaletteSelectHandler,
} from "../../../commandPalette/CommandPaletteFrame";
import { HighlightedTitle } from "../../../commandPalette/HighlightedTitle";
import {
  Highlighted,
  highlightFilteredCommandTitle,
} from "../../../commandPalette/commandFilter";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1, NiceH2, NiceH3 } from "../../../nice/NiceH";
import { NiceInput } from "../../../nice/NiceInput";
import { TextField } from "../../../nice/TextField";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { tick } from "../../../time/timeManipulator";
import { Action, ActionPattern, breakActions } from "../../Action";
import {
  CommandDefinition,
  findCommandDefinition,
} from "../../CommandDefinition";
import {
  KeyboardShortcut,
  createKeyboardShortcut,
} from "../../KeyboardShortcut";
import { useShortcutRunner } from "../../keyboardShortcutHooks";
import { useCommandPalette } from "./commandPaletteHooks";
import { useDemoActions } from "./demoActions";
import { DemoFile, getDemoFiles } from "./demoFiles";

export function ActionPageActionSystemDemoPage(): React.JSX.Element {
  const demoFiles = useFiles();
  const [userShortcuts, setUserShortcuts] = useState<KeyboardShortcut[]>([]);

  // form inputs
  const [commandInput, setCommandInput] = useState("");
  const [shortcutInput, setShortcutInput] = useState(createKeyboardShortcut());

  // command palette
  const [
    commandPaletteVisible,
    setCommandPaletteVisible,
    paletteInput,
    setPaletteInput,
    commandPaletteActions,
  ] = useCommandPalette();
  const [commands, shortcuts, commandOptions] = useActiveActions(
    commandPaletteActions,
    userShortcuts,
  );

  // command palette input management
  const [paletteMode, options] = usePaletteOptions(
    demoFiles,
    paletteInput,
    commands, // TODO replace with commandOptions
  );

  // start observing keyboard shortcut inputs
  const conditions = {};
  useShortcutRunner(commands, shortcuts, conditions);

  // ---------------------------------------------------------------------------
  // callbacks

  const onCommandInputSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const command = findCommandDefinition(commands, commandInput);
    if (command) {
      command.exec();
    } else {
      window.alert(`Command not found: ${commandInput}`);
    }
  };

  const onUserShortcutSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const index = userShortcuts.findIndex(
      (v) => shortcutInput.keyboard === v.keyboard,
    );
    if (index < 0) {
      setUserShortcuts([...userShortcuts, shortcutInput]);
    } else {
      const copy = [...userShortcuts];
      copy.splice(index, 1, shortcutInput);
      setUserShortcuts(copy);
    }
    setShortcutInput(createKeyboardShortcut());
  };

  const onPaletteSelect: CommandPaletteSelectHandler<
    Highlighted<CommandPaletteOption | CommandDefinition>
  > = (selected) => {
    if (!selected) {
      setCommandPaletteVisible(false);
      return;
    }

    setCommandPaletteVisible(false);

    tick().then(() => {
      if ("exec" in selected) {
        selected.exec();
      } else {
        window.alert(`File selected: ${selected.title}`);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // rendering

  return (
    <StraightLayout title="Command demos">
      <VStack>
        <NiceH1>Page command system</NiceH1>
        <p>There are three ways to execute commands:</p>
        <ul className="ui-ul">
          <li>Execute by program</li>
          <li>Execute from command palette</li>
          <li>Execute by keyboard shortcuts</li>
        </ul>
        <p>Here is how to prepare them:</p>
        <ol className="ui-ol">
          <li>
            Prepare commands (<NiceCode>CommandDefinition[]</NiceCode>) and
            shortcuts (<NiceCode>KeyboardShortcut[]</NiceCode>)
          </li>
          <li>
            Switch command palette options by input prefix like{" "}
            <NiceCode>{">"}</NiceCode>
          </li>
          <li>Filter command palette options by input</li>
          <li>
            Run <NiceCode>useKeyboardShortcuts()</NiceCode>
            <ol className="ui-ol">
              <li>
                Find a command by <NiceCode>pickCommandDefinition()</NiceCode>{" "}
                and run <NiceCode>command.exec()</NiceCode>
              </li>
            </ol>
          </li>
          <li>
            Place <NiceCode>{"<CommandPaletteFrame>"}</NiceCode>
          </li>
        </ol>
        <NiceH2>Example</NiceH2>
        <p>
          <NiceButton onClick={() => setCommandPaletteVisible(true)}>
            Show command palette
          </NiceButton>
        </p>
        <details className="ui-details" open>
          <summary>Commands</summary>
          <VStack className="ui-details--content">
            <form onSubmit={onCommandInputSubmit}>
              <label>
                Exec command:{" "}
                <NiceInput
                  list="commandDataList"
                  onChange={(v) => setCommandInput(v.target.value)}
                  type="text"
                  value={commandInput}
                />
              </label>
              <NiceButton>Exec</NiceButton>
              <datalist id="commandDataList">
                {commands.map((command) => (
                  <option key={command.id} value={command.id} />
                ))}
              </datalist>
            </form>
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((command) => (
                  <tr key={command.id}>
                    <td>{command.title}</td>
                    <td>
                      <NiceCode>{command.id}</NiceCode>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </VStack>
        </details>
        <details className="ui-details" open>
          <summary>Shortcuts</summary>
          <VStack className="ui-details--content">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Args</th>
                  <th>Keybinding</th>
                  <th>When?</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((shortcut) => (
                  <tr key={shortcut.keyboard}>
                    <td>
                      <NiceCode>{shortcut.commandId}</NiceCode>
                    </td>
                    <td>
                      {shortcut.args ? (
                        <NiceCode>{JSON.stringify(shortcut.args)}</NiceCode>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <NiceCode>{shortcut.keyboard}</NiceCode>
                    </td>
                    <td>
                      {(shortcut.when && <NiceCode>shortcut.when</NiceCode>) ||
                        "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <NiceH3>User shortcuts</NiceH3>
            <form className="UserShortcutForm" onSubmit={onUserShortcutSubmit}>
              <div className="flex items-end gap-4">
                <TextField
                  label="Command ID"
                  list="userShortcutDataList"
                  onChange={(v) =>
                    setShortcutInput({
                      ...shortcutInput,
                      commandId: v.target.value,
                    })
                  }
                  pattern={commands.map((v) => v.id).join("|")}
                  value={shortcutInput.commandId}
                />
                <TextField
                  label="Keybinding"
                  placeholder="Ctrl+Alt+Shift+A"
                  onChange={(v) =>
                    setShortcutInput({
                      ...shortcutInput,
                      keyboard: v.target.value,
                    })
                  }
                  pattern="(Ctrl\+)?(Alt\+)?(Shift\+)?\w*"
                  value={shortcutInput.keyboard}
                />
                <NiceButton>Add</NiceButton>
                <datalist id="userShortcutDataList">
                  {commands.map((command) => (
                    <option key={command.id} value={command.id} />
                  ))}
                </datalist>
              </div>
            </form>
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Keybinding</th>
                  <th>When?</th>
                </tr>
              </thead>
              <tbody>
                {userShortcuts.map((shortcut) => (
                  <tr key={`${shortcut.keyboard}-${shortcut.when ?? ""}`}>
                    <td>
                      <NiceCode>{shortcut.commandId}</NiceCode>
                    </td>
                    <td>
                      <NiceCode>{shortcut.keyboard}</NiceCode>
                    </td>
                    <td>
                      {(shortcut.when && <NiceCode>shortcut.when</NiceCode>) ||
                        "-"}
                    </td>
                  </tr>
                ))}
                {userShortcuts.length === 0 && (
                  <tr>
                    <td colSpan={3}>
                      <small>No shortcuts</small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </VStack>
        </details>
      </VStack>
      <CommandPaletteFrame<Highlighted<CommandPaletteOption>>
        emptyMessage="No match"
        getKey={(v) => v.id}
        input={paletteInput}
        onInput={setPaletteInput}
        onSelect={onPaletteSelect}
        open={commandPaletteVisible}
        options={options}
        renderItem={(value) =>
          paletteMode === "file" ? (
            <HighlightedTitle chars={value.highlightedCharacters} />
          ) : (
            <CommandOption
              shortcut={shortcuts.find((v) => v.commandId === value.id)}
              value={value}
            />
          )
        }
      />
    </StraightLayout>
  );
}

ActionPageActionSystemDemoPage.path = "action/pageActionSystem" as const;

function CommandOption({
  shortcut,
  value,
}: {
  shortcut: KeyboardShortcut | undefined;
  value: Highlighted<CommandPaletteOption>;
}): React.JSX.Element {
  return (
    <>
      <HighlightedTitle chars={value.highlightedCharacters} />
      {shortcut && (
        <>
          {" "}
          <code className="bg-gray-100 text-xs">{shortcut.keyboard}</code>
        </>
      )}
    </>
  );
}

function useFiles() {
  return useMemo(() => {
    return getDemoFiles();
  }, []);
}

function useActiveActions(
  generalActions: Action[],
  userShortcuts: KeyboardShortcut[],
): [CommandDefinition[], KeyboardShortcut[], ActionPattern[]] {
  const specificActions = useDemoActions();

  return useMemo(() => {
    const [commands, shortcuts, options] = breakActions([
      ...specificActions,
      ...generalActions,
    ]);
    const combinedShortcuts = [...shortcuts, ...userShortcuts];

    return [commands, combinedShortcuts, options];
  }, [generalActions, specificActions, userShortcuts]);
}

function usePaletteOptions(
  demoFiles: DemoFile[],
  paletteInput: string,
  commands: CommandDefinition<any[]>[],
): ["command" | "file", Highlighted<CommandPaletteOption>[]] {
  const [paletteMode, allOptions] = useMemo<
    ["command", CommandDefinition[]] | ["file", typeof demoFiles]
  >(() => {
    if (paletteInput.startsWith(">")) {
      return ["command", commands];
    }

    return ["file", demoFiles];
  }, [commands, demoFiles, paletteInput]);

  const filteredHighlightedOptions = useMemo(() => {
    const result: Highlighted<CommandPaletteOption>[] = [];
    for (const option of allOptions) {
      const chars = highlightFilteredCommandTitle(
        option.title ?? "",
        paletteInput.slice(1).trim(),
      );
      if (chars) {
        result.push({
          highlightedCharacters: chars,
          ...option,
          title: option.title ?? "",
        });
      }
    }
    return result;
  }, [allOptions, paletteInput]);

  return [paletteMode, filteredHighlightedOptions];
}
