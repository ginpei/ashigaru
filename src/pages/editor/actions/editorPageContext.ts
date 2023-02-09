import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { createEditorPageState, EditorPageState } from "./EditorPageState";

const EditorPageContext = createContext<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>([createEditorPageState(), () => undefined]);

export const EditorPageStateProvider = EditorPageContext.Provider;

export function useEditorPageStateContext(): [
  EditorPageState,
  Dispatch<SetStateAction<EditorPageState>>
] {
  return useContext(EditorPageContext);
}
