import { useEffect, useState } from "react";

export function useFocusTarget(d?: Document): string {
  const el = useFocusElement(d);
  const attrName = "data-focus-target";
  const elTarget = el?.closest(`[${attrName}]`);
  const id = elTarget?.getAttribute(attrName) ?? "";
  return id;
}

function useFocusElement(d?: Document): Element | null {
  const [elFocus, setElFocus] = useState<Element | null>(null);

  useEffect(() => {
    const d2 = d ?? document;
    const interval = 100;
    const w = d2.defaultView;
    if (!w) {
      return;
    }

    const tm = w.setInterval(() => {
      const el = d2.activeElement;
      if (el === elFocus) {
        return;
      }
      setElFocus(el);
    }, interval);

    return () => w.clearInterval(tm);
  }, [d, elFocus]);

  return elFocus;
}
