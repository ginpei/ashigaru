import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Note } from "../../../domains/note/Note";
import {
  closeNoteState,
  createEditorPageState,
  EditorPageState,
  getEditingNote,
  startEditingNoteState,
  updateEditingNote,
} from "./EditorPageState";

const EditorPageContext = createContext<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>([createEditorPageState(), () => undefined]);

export const EditorPageStateProvider = EditorPageContext.Provider;

export function useEditorPageState(): EditorPageState {
  const [state] = useContext(EditorPageContext);
  return state;
}

export function useEditingNote(): Note | null {
  const [state] = useContext(EditorPageContext);
  return getEditingNote(state);
}

export function useStartEditingNote(): (id: string) => void {
  const [state, set] = useContext(EditorPageContext);
  return (id) => set(startEditingNoteState(state, id));
}

export function useCloseNote(): (id: string) => void {
  const [state, set] = useContext(EditorPageContext);
  return (id) => {
    return set(closeNoteState(state, id));
  };
}

export function useUpdateEditingNote(): (note: Partial<Note>) => void {
  const [state, set] = useContext(EditorPageContext);
  return (note) => {
    const newState = updateEditingNote(state, note);
    set(newState);
  };
}
