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
import { getDemoActions1 } from "./demoActions";
import { getDemoFiles } from "./demoFiles";

export function ActionPageActionSystemDemoPage(): React.JSX.Element {
  const [
    commandPaletteVisible,
    setCommandPaletteVisible,
    paletteInput,
    setPaletteInput,
    commandPaletteActions,
  ] = useCommandPalette();

  const [commandInput, setCommandInput] = useState("");

  const [userShortcut, setUserShortcut] = useState(createKeyboardShortcut());
  const [userShortcuts, setUserShortcuts] = useState<KeyboardShortcut[]>([]);

  const [predefinedCommands, predefinedShortcuts] = usePredefinedActions();
  const [pageCommands, pageShortcuts] = usePageActions(commandPaletteActions);
  const demoFiles = useFiles();

  // combine available commands
  const commands = useMemo(() => {
    return [...pageCommands, ...predefinedCommands];
  }, [pageCommands, predefinedCommands]);

  // combine available shortcuts
  const shortcuts = useMemo(() => {
    return [...userShortcuts, ...pageShortcuts, ...predefinedShortcuts];
  }, [pageShortcuts, predefinedShortcuts, userShortcuts]);
  const defaultShortcuts = useMemo(() => {
    return [...pageShortcuts, ...predefinedShortcuts];
  }, [pageShortcuts, predefinedShortcuts]);

  // command palette input management
  const [inputType, actualInput, options] = useMemo<
    | ["command", string, CommandDefinition[]]
    | ["file", string, typeof demoFiles]
  >(() => {
    if (paletteInput.startsWith(">")) {
      return ["command", paletteInput.slice(1).trim(), commands];
    }

    return ["file", paletteInput, demoFiles];
  }, [commands, demoFiles, paletteInput]);

  // filter command palette options
  const filteredOptions = useMemo(() => {
    const result: Highlighted<CommandPaletteOption>[] = [];
    for (const option of options) {
      const chars = highlightFilteredCommandTitle(
        option.title ?? "",
        actualInput,
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
  }, [actualInput, options]);

  // start observing keyboard shortcut inputs
  useShortcutRunner(commands, shortcuts, {});

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
      (v) => userShortcut.keyboard === v.keyboard,
    );
    if (index < 0) {
      setUserShortcuts([...userShortcuts, userShortcut]);
    } else {
      const copy = [...userShortcuts];
      copy.splice(index, 1, userShortcut);
      setUserShortcuts(copy);
    }
    setUserShortcut(createKeyboardShortcut());
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
                {defaultShortcuts.map((shortcut) => (
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
                    setUserShortcut({
                      ...userShortcut,
                      commandId: v.target.value,
                    })
                  }
                  pattern={commands.map((v) => v.id).join("|")}
                  value={userShortcut.commandId}
                />
                <TextField
                  label="Keybinding"
                  placeholder="Ctrl+Alt+Shift+A"
                  onChange={(v) =>
                    setUserShortcut({
                      ...userShortcut,
                      keyboard: v.target.value,
                    })
                  }
                  pattern="(Ctrl\+)?(Alt\+)?(Shift\+)?\w*"
                  value={userShortcut.keyboard}
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
        options={filteredOptions}
        renderItem={(value) =>
          inputType === "file" ? (
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

function usePredefinedActions(): [
  CommandDefinition[],
  KeyboardShortcut[],
  ActionPattern[],
] {
  return useMemo(() => {
    const actions = getDemoActions1();
    return breakActions(actions);
  }, []);
}

function usePageActions(
  commandPaletteActions: Action[],
): [CommandDefinition[], KeyboardShortcut[], ActionPattern[]] {
  return useMemo(() => {
    return breakActions(commandPaletteActions);
  }, [commandPaletteActions]);
}

function useFiles() {
  return useMemo(() => {
    return getDemoFiles();
  }, []);
}
