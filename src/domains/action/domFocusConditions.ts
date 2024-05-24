import { createConditionFunction } from "./Condition";

export const inputCondition = createConditionFunction("system", "input", () => {
  const elActive = document.activeElement;
  if (!(elActive instanceof HTMLElement)) {
    return false;
  }

  // not active
  if (elActive.matches(":disabled")) {
    return false;
  }

  // long text
  if (elActive instanceof HTMLTextAreaElement || elActive.isContentEditable) {
    return true;
  }

  // text input
  if (elActive instanceof HTMLInputElement) {
    const inputTypes = [
      "text",
      "search",
      "tel",
      "url",
      "email",
      "password",
      "number",
    ];
    return inputTypes.includes(elActive.type);
  }

  return false;
});

export const focusCondition = createConditionFunction(
  "system",
  "focus",
  ([id]) => {
    const elActive = document.activeElement;
    if (!(elActive instanceof HTMLElement)) {
      return false;
    }

    return isFocusDescendant(elActive as HTMLElement, id);
  },
);

export const focusAtCondition = createConditionFunction(
  "system",
  "focusAt",
  ([id]) => {
    const elFocus = document.activeElement;
    if (!elFocus) {
      return false;
    }

    const el = elFocus.closest("[data-focus-target]");
    if (!el) {
      return false;
    }

    const focusId = el.getAttribute("data-focus-target");

    return focusId === id;
  },
);

function isFocusDescendant(el: HTMLElement, id: string): boolean {
  const elFocus = el.closest("[data-focus-target]");
  if (!(elFocus instanceof HTMLElement)) {
    return false;
  }

  const focusId = elFocus.getAttribute("data-focus-target");

  if (focusId === id) {
    return true;
  }

  const elParent = elFocus.parentElement;
  if (!elParent) {
    return false;
  }

  return isFocusDescendant(elParent, id);
}
