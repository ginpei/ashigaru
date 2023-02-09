import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Note } from "../../../domains/note/Note";
import {
  createEditorPageState,
  EditorPageState,
  getEditingNote,
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
  return (id) =>
    set({
      ...state,
      editingNoteId: id,
      focusedNoteId: id,
      openNoteIds: state.openNoteIds.includes(id)
        ? state.openNoteIds
        : state.openNoteIds.concat(id),
      selectedNoteIds: [id],
    });
}

export function useCloseNote(): (id: string) => void {
  const [state, set] = useContext(EditorPageContext);
  return (id) => {
    const editingNoteId = state.editingNoteId === id ? "" : state.editingNoteId;
    const openNoteIds = state.openNoteIds.filter((v) => v !== id);

    return set({
      ...state,
      editingNoteId,
      openNoteIds,
    });
  };
}

export function useUpdateEditingNote(): (note: Partial<Note>) => void {
  const [state, set] = useContext(EditorPageContext);
  return (note) => {
    const newState = updateEditingNote(state, note);
    set(newState);
  };
}
