export type ConditionFunction = ((args: any[]) => boolean) & {
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
  fn: (args: string[]) => boolean,
): ConditionFunction {
  const condition = ((...args) => fn(...args)) as ConditionFunction; // not to modify the original function instance
  condition.key = key;
  condition.source = source;
  return condition;
}

export function doesConditionMatch(
  condition: string,
  conditions: ConditionFunctionMap,
): boolean {
  if (condition.trim() === "") {
    return true;
  }

  const token = tokenizeConditionString(condition);
  const matched = evalCondition(token, conditions);
  return matched;
}

function evalCondition(
  token: ConditionToken,
  conditions: ConditionFunctionMap,
): boolean {
  if (token.type === "function") {
    const fn = conditions[token.key];
    const matched = fn?.(token.arg.split(",")) ?? false;
    return token.negative ? !matched : matched;
  }

  if (token.type === "operator") {
    const left = evalCondition(token.left, conditions);
    const right = evalCondition(token.right, conditions);

    if (token.key === "&&") {
      return left && right;
    }

    if (token.key === "||") {
      return left || right;
    }

    throw new Error(`Unknown operator: ${token.key}`);
  }

  // @ts-expect-error: Property type does not exist on type
  throw new Error(`Unknown token type: ${token.type}`);
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
