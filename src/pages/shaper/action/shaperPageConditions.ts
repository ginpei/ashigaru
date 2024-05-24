import { ConditionFunctionMap } from "../../../domains/action/Condition";
import { focusCondition } from "../../../domains/action/domFocusConditions";

export function useShaperPageConditions(): ConditionFunctionMap {
  return {
    focus: focusCondition,
  };
}
