import { MouseEventHandler } from "react";
import { selectShape } from "../page/ShaperPageState";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { Marquee, MarqueeProps } from "./Marquee";
import { ShapeDisplay } from "./ShapeDisplay";

export function CanvasPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();

  const selectedShapes = shapes.filter((shape) =>
    selectedShapeIds.includes(shape.id),
  );

  const onCanvasClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onShapeSelect("", "single");
  };

  const onShapeSelect: MarqueeProps["onSelect"] = (id, type) => {
    setState((state) => selectShape(state, [id], type));
  };

  return (
    <div className="CanvasPane relative size-full" onMouseDown={onCanvasClick}>
      {shapes.map((data) => (
        <ShapeDisplay key={data.id} onSelect={onShapeSelect} shape={data} />
      ))}
      {selectedShapes.map((data) => (
        <Marquee key={data.id} onSelect={onShapeSelect} shape={data} />
      ))}
    </div>
  );
}
