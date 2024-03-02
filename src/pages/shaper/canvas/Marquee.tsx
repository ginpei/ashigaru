import { MouseEventHandler } from "react";
import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";

export interface MarqueeProps {
  onSelect: (id: string, type: "single" | "append") => void;
  shape: ShapeData;
}

export function Marquee({ onSelect, shape }: MarqueeProps): JSX.Element {
  const layoutStyle = getShapeLayoutStyle(shape);

  const onItemClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const type = event.ctrlKey ? "append" : "single";
    onSelect(shape.id, type);
  };

  return (
    <button
      className="
        Marquee
        absolute overflow-hidden border-2 border-dashed border-blue-900 bg-blue-900/50 p-4 text-xs text-white
        hover:bg-blue-500/50
      "
      onClick={onItemClick}
      style={layoutStyle}
    >
      {shape.name}
    </button>
  );
}
