import { MouseEventHandler } from "react";
import { ShapeData } from "../shape/ShapeData";
import { canvasDataToStyle } from "../shape/shapeStyleFunctions";
import { MarqueeProps } from "./Marquee";

export interface ShapeDisplayProps {
  dx: number;
  dy: number;
  shape: ShapeData;
  onSelect: MarqueeProps["onSelect"];
}

export function ShapeDisplay({
  dx,
  dy,
  shape,
  onSelect,
}: ShapeDisplayProps): JSX.Element {
  const onShapeClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const type = event.ctrlKey ? "append" : "single";
    onSelect(shape.id, type);
  };

  const style = canvasDataToStyle(shape);
  const translatedStyle: typeof style = {
    ...style,
    left: Number(style.left) + dx,
    top: Number(style.top) + dy,
  };
  return (
    <button
      className="absolute"
      onClick={onShapeClick}
      style={translatedStyle}
    />
  );
}
