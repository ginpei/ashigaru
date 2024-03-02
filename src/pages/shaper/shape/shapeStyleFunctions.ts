import { CSSProperties } from "react";
import { ShapeData } from "./ShapeData";

export function getShapeLayoutStyle(
  shape: ShapeData,
): Required<Pick<CSSProperties, "top" | "left" | "width" | "height">> {
  return {
    top: shape.top,
    left: shape.left,
    width: shape.width,
    height: shape.height,
  };
}
