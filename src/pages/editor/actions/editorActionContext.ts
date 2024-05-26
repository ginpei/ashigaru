import { createContext, useContext } from "react";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/action/KeyboardShortcut";

const EditorActionContext = createContext<
  [CommandDefinition[], KeyboardShortcut[]]
>([[], []]);

export const EditorActionContextProvider = EditorActionContext.Provider;

export function useEditorActions(): [CommandDefinition[], KeyboardShortcut[]] {
  return useContext(EditorActionContext);
}
