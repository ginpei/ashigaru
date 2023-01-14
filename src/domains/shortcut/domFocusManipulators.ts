/**
 * @returns `false` if failed to find a target element.
 */
export function giveFocusOn(focusId: string): boolean {
  const el = document.querySelector(`[data-focus-target='${focusId}']`);
  if (!el) {
    return false;
  }

  const elFocusable = el.querySelector(
    ":where(a, input, select, textarea, [tabindex]):not(:disabled, [tabindex='-1'])"
  );
  if (!elFocusable || !(elFocusable instanceof HTMLElement)) {
    return false;
  }

  elFocusable.focus();
  return true;
}
