import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { createEditorPageState, EditorPageState } from "./EditorPageState";

const EditorPageStateContext = createContext<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>([createEditorPageState(), () => undefined]);

export const EditorPageStateProvider = EditorPageStateContext.Provider;

export function useEditorPageStateContext(): [
  EditorPageState,
  Dispatch<SetStateAction<EditorPageState>>,
] {
  return useContext(EditorPageStateContext);
}
