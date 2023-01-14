import { useEffect, useState } from "react";

export function useFocusElement(
  callback: (el: Element | null) => void,
  d?: Document
): void {
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

  useEffect(() => {
    callback(elFocus);
  }, [callback, elFocus]);
}

export function useFocusTarget(d?: Document): string {
  const [id, setId] = useState("");

  useFocusElement((el) => {
    const attrName = "data-focus-target";
    const elTarget = el?.closest(`[${attrName}]`);
    const newId = elTarget?.getAttribute(attrName) ?? "";
    if (newId === id) {
      return;
    }

    setId(newId);
  }, d);

  return id;
}
