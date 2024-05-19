export type ConditionFunction = ((args?: any[]) => boolean) & {
  key: string;
  source: string;
};

export interface ConditionFunctionMap {
  [key: string]: ConditionFunction;
}

export function createConditionFunction(
  source: string,
  key: string,
  fn: (args?: any[]) => boolean,
): ConditionFunction {
  const condition = (() => fn()) as ConditionFunction; // not to modify the original function instance
  condition.key = key;
  condition.source = source;
  return condition;
}

export function doesConditionMatch(
  condition: string,
  conditions: ConditionFunctionMap,
): boolean {
  if (!condition) {
    return true;
  }

  const doesConditionMatch = conditions[condition];
  if (!doesConditionMatch) {
    return false;
  }

  const matched = doesConditionMatch();
  return matched;
}
