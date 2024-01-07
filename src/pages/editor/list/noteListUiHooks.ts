import { useEffect } from "react";

export function useListScrollEffect(
  el: Element | null,
  elContainer: Element | null,
): void {
  useEffect(() => {
    if (!el || !elContainer) {
      return;
    }

    const iRect = el.getBoundingClientRect();
    const cRect = elContainer.getBoundingClientRect();
    if (iRect.top < cRect.top) {
      elContainer.scrollBy(0, iRect.top - cRect.top);
    } else if (iRect.bottom > cRect.bottom) {
      elContainer.scrollBy(0, iRect.bottom - cRect.bottom);
    }
  }, [el, elContainer]);
}
