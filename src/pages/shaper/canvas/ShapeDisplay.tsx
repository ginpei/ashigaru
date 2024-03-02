import { MouseEventHandler } from "react";
import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";
import { MarqueeProps } from "./Marquee";

export interface ShapeDisplayProps {
  shape: ShapeData;
  onSelect: MarqueeProps["onSelect"];
}

export function ShapeDisplay({
  shape,
  onSelect,
}: ShapeDisplayProps): JSX.Element {
  const onShapeClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const type = event.ctrlKey ? "append" : "single";
    onSelect(shape.id, type);
  };

  return <button onClick={onShapeClick} style={canvasDataToStyle(shape)} />;
}

function canvasDataToStyle(data: ShapeData): React.CSSProperties {
  return {
    ...getShapeLayoutStyle(data),
    backgroundColor: data.color,
    position: "absolute",
  };
}
