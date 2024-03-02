import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";

export interface MarqueeProps {
  shape: ShapeData;
}

export function Marquee({ shape }: MarqueeProps): JSX.Element {
  const layoutStyle = getShapeLayoutStyle(shape);
  return (
    <div
      className="
        Marquee
        absolute overflow-hidden border-2 border-dashed border-blue-900 bg-blue-900/50 text-xs text-white
        hover:bg-blue-500/50
      "
      style={layoutStyle}
    >
      {shape.name}
    </div>
  );
}
