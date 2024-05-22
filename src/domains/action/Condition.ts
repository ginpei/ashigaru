export type ConditionFunction = ((args?: any[]) => boolean) & {
  key: string;
  source: string;
};

export interface ConditionFunctionMap {
  [key: string]: ConditionFunction;
}

export type ConditionToken = ConditionFunctionToken | ConditionOperatorToken;

export interface ConditionFunctionToken {
  arg: string;
  key: string;
  negative: boolean;
  type: "function";
}

export interface ConditionOperatorToken {
  key: "&&" | "||";
  left: ConditionToken;
  right: ConditionToken;
  type: "operator";
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

export function tokenizeConditionString(condition: string): ConditionToken {
  const operators = ["||", "&&"] as const;
  for (const operator of operators) {
    const index = condition.indexOf(operator);
    if (index >= 0) {
      const token: ConditionOperatorToken = {
        key: operator,
        left: tokenizeConditionString(condition.slice(0, index)),
        right: tokenizeConditionString(condition.slice(index + 2)),
        type: "operator",
      };
      return token;
    }
  }

  const token = readFunctionToken(condition);
  return token;
}

function readFunctionToken(expression: string): ConditionFunctionToken {
  // break down condition function
  // "!foo:bar" => ["!foo:bar", "!", "foo", "bar"]
  const rxToken = /^(!?)((?:\w|\.)*)(?::([\w,]+))?$/;

  const trimmed = expression.trim();
  if (!trimmed) {
    throw new Error("Empty condition string");
  }

  const tokens = trimmed.match(rxToken);
  if (!tokens) {
    throw new Error(`Invalid condition function: ${trimmed}`);
  }

  const [, sNegative, key, arg = ""] = tokens;
  return {
    arg,
    key,
    negative: sNegative === "!",
    type: "function",
  };
}
