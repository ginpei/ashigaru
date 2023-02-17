import { computePosition, offset, flip, shift, arrow } from "@floating-ui/dom";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";

export type FloatingStyle = Pick<CSSProperties, "left" | "top">;

// TODO extract
export function useFloatingStyle(): [
  FloatingStyle,
  Dispatch<SetStateAction<FloatingStyle>>
] {
  return useState<FloatingStyle>({});
}

export async function calcFloatingStyle(
  elRef: Element,
  elPopup: HTMLElement,
  elArrow?: HTMLElement | null
): Promise<FloatingStyle> {
  const shiftPadding = 4; // px
  const { middlewareData, placement, x, y } = await computePosition(
    elRef,
    elPopup,
    {
      middleware: [
        // offset(6),
        flip(),
        shift({ padding: shiftPadding }),
        elArrow && arrow({ element: elArrow }),
      ],
      placement: "bottom-start",
    }
  );

  return {
    left: x,
    top: y,
  };

  // popupX = x;
  // popupY = y;

  // arrowX = middlewareData.arrow?.x ?? Number.NEGATIVE_INFINITY;
  // arrowY = middlewareData.arrow?.y ?? Number.NEGATIVE_INFINITY;
  // tooltipSide = placement;
}
