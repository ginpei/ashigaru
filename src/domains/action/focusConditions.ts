import { createConditionFunction } from "./Condition";

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

    const el = elFocus.closest("[data-focus]");
    if (!el) {
      return false;
    }

    const focusId = el.getAttribute("data-focus");

    return focusId === id;
  },
);

function isFocusDescendant(el: HTMLElement, id: string): boolean {
  const elFocus = el.closest("[data-focus]");
  if (!(elFocus instanceof HTMLElement)) {
    return false;
  }

  const focusId = elFocus.getAttribute("data-focus");

  if (focusId === id) {
    return true;
  }

  const elParent = elFocus.parentElement;
  if (!elParent) {
    return false;
  }

  return isFocusDescendant(elParent, id);
}
