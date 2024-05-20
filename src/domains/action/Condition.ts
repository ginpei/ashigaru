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

export function parseConditionString(condition: string): ConditionToken[] {
  // TODO rename

  const conditions: ConditionToken[] = [];
  for (const expression of tokenize(condition)) {
    const token = readToken(expression);
    conditions.push(token);
  }
  return conditions;
}

/**
 * @example
 * tokenize("foo"); // ["foo"]
 * tokenize("!foo"); // ["!foo"]
 * tokenize("foo:arg"); // ["foo:arg"]
 * tokenize("foo&&bar || baz"); // ["foo", "&&", "bar", "||", "baz"]
 */
function tokenize(expression: string) {
  const rxToken = /(?:[!]?[\w.]+(?::[\w,]+)?|&&|\|\|)/g;
  const tokens = expression.match(rxToken);
  if (!tokens) {
    throw new Error(`Invalid condition string: ${expression}`);
  }

  if (tokens.length % 2 === 0) {
    throw new Error(`Invalid operator pair: ${expression}`);
  }

  const orderCorrect = tokens.every((token, index) => {
    if (index % 2 === 0) {
      return token !== "&&" && token !== "||";
    }
    return token === "&&" || token === "||";
  });
  if (!orderCorrect) {
    throw new Error(`Invalid operator order: ${expression}`);
  }

  return tokens;
}

function readToken(expression: string): ConditionToken {
  // break down condition function
  // "!foo:bar" => ["!foo:bar", "!", "foo", "bar"]
  const rxToken = /^(!?)((?:\w|\.)*)(?::([\w,]+))?$/;

  if (expression === "&&" || expression === "||") {
    return {
      key: expression as "&&" | "||",
      type: "operator",
    };
  }

  const tokens = expression.match(rxToken);
  if (!tokens) {
    throw new Error(`Invalid condition token: ${expression}`);
  }

  const [, sNegative, key, arg] = tokens;
  return {
    arg,
    key,
    negative: sNegative === "!",
    type: "function",
  };
}
