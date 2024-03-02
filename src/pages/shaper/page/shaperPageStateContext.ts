import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { ShaperPageState } from "./ShaperPageState";

const ShaperPageStateContext = createContext<
  [ShaperPageState, Dispatch<SetStateAction<ShaperPageState>>]
>([
  {
    shapes: [],
    selectedShapeIds: [],
  },
  () => {},
]);

export const ShaperPageStateContextProvider = ShaperPageStateContext.Provider;

export function useShaperPageStateContext() {
  return useContext(ShaperPageStateContext);
}
