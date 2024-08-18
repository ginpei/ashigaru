import { Dispatch, SetStateAction, useMemo } from "react";
import { ActionPattern } from "../../../domains/action/Action";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/action/KeyboardShortcut";
import { breakActions } from "../../../domains/action/breakActionFunctions";
import { ShaperPageState } from "../page/ShaperPageState";
import { createShaperPageActions } from "./shaperPageActions";

export function useShaperPageActions(
  state: ShaperPageState,
  setState: Dispatch<SetStateAction<ShaperPageState>>,
): [CommandDefinition[], KeyboardShortcut[], ActionPattern[]] {
  return useMemo(() => {
    const actions = createShaperPageActions(state, setState);
    return breakActions(actions);
  }, [state, setState]);
}

export function useShaperPageCommand(id: string) {}
