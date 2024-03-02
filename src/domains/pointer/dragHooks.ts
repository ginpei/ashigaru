import { RefObject, createRef, useEffect, useState } from "react";

export interface DragHandlers {
  /**
   * Triggered when clicked without dragging.
   * `onStart` will not be triggered when this is invoked.
   */
  onClick?: (event: MouseEvent) => void;
  /**
   * @param ok `false` if canceled.
   */
  onEnd?: (x: number, y: number, ok: boolean) => void;
  /**
   * Triggered when dragging starts.
   * `onClick` will not be triggered when this is invoked.
   */
  onStart?: (event: PointerEvent) => void;
}

/**
 * Highly recommended to apply `touch-action: none` to the element.
 * @example
 * <div ref={refDrag} style={{ touchAction: "none", userSelect: "none" }}>
 * <!-- for Tailwind CSS -->
 * <div ref={refDrag} className="touch-none select-none">
 */
export function useDrag<Element extends HTMLElement>(
  handlers: DragHandlers,
): [ref: RefObject<Element>, dx: number, dy: number] {
  const ref = createRef<Element>();
  const [dragging, setDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [ox, setOx] = useState(0);
  const [oy, setOy] = useState(0);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    el.addEventListener("click", onClick);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);

    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
    };

    function onClick(event: MouseEvent) {
      if (dragged) {
        return;
      }

      handlers.onClick?.(event);
    }

    function onPointerDown(event: PointerEvent) {
      setDragged(false);
      el?.setPointerCapture(event.pointerId);
      setDragging(true);
      setOx(event.clientX);
      setOy(event.clientY);
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging) {
        return;
      }

      if (!dragged) {
        setDragged(true);
        handlers.onStart?.(event);
      }

      const x = event.clientX - ox;
      const y = event.clientY - oy;
      setDx(x);
      setDy(y);
    }

    function onPointerUp(event: PointerEvent) {
      el?.releasePointerCapture(event.pointerId);
      setDragging(false);
      handlers.onEnd?.(dx, dy, true);
      setDx(0);
      setDy(0);
    }

    function onPointerCancel(event: PointerEvent) {
      el?.releasePointerCapture(event.pointerId);
      setDragging(false);
      handlers.onEnd?.(dx, dy, false);
      setDx(0);
      setDy(0);
    }
  }, [dragged, dragging, dx, dy, handlers, ox, oy, ref]);

  return [ref, dx, dy];
}
