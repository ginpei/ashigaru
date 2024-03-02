import { MouseEventHandler } from "react";
import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";
import { Marquee, MarqueeProps } from "./Marquee";

export interface ShaperCanvasProps {
  selectedIds: string[];
  data: ShapeData[];
  onSelect: MarqueeProps["onSelect"];
}

export function ShaperCanvas({
  selectedIds,
  data,
  onSelect,
}: ShaperCanvasProps): JSX.Element {
  const selectedShapes = data.filter((shape) => selectedIds.includes(shape.id));

  const onCanvasClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onSelect("", "single");
  };

  return (
    <div
      className="ShaperCanvas relative size-full"
      onMouseDown={onCanvasClick}
    >
      {data.map((data) => (
        <ShapeDisplay key={data.id} onSelect={onSelect} shape={data} />
      ))}
      {selectedShapes.map((data) => (
        <Marquee key={data.id} onSelect={onSelect} shape={data} />
      ))}
    </div>
  );
}

interface ShapeDisplayProps {
  shape: ShapeData;
  onSelect: MarqueeProps["onSelect"];
}

function ShapeDisplay({ shape, onSelect }: ShapeDisplayProps): JSX.Element {
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
