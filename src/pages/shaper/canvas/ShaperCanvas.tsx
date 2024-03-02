import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";
import { Marquee } from "./Marquee";

export interface ShaperCanvasProps {
  selectedIds: string[];
  data: ShapeData[];
}

export function ShaperCanvas({
  selectedIds,
  data,
}: ShaperCanvasProps): JSX.Element {
  const selectedShapes = data.filter((shape) => selectedIds.includes(shape.id));

  return (
    <div className="ShaperCanvas relative">
      {data.map((data) => (
        <div key={data.id} style={canvasDataToStyle(data)} />
      ))}
      {selectedShapes.map((data) => (
        <Marquee key={data.id} shape={data} />
      ))}
    </div>
  );
}

function canvasDataToStyle(data: ShapeData): React.CSSProperties {
  return {
    ...getShapeLayoutStyle(data),
    backgroundColor: data.color,
    position: "absolute",
  };
}
