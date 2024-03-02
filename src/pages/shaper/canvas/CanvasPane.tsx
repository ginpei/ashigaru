import { MouseEventHandler } from "react";
import { useCommand } from "../action/commandContext";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { Marquee, MarqueeProps } from "./Marquee";
import { ShapeDisplay } from "./ShapeDisplay";

export function CanvasPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();
  const selectShape = useCommand("selectShape");

  const selectedShapes = shapes.filter((shape) =>
    selectedShapeIds.includes(shape.id),
  );

  const onCanvasClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    selectShape?.exec([], "single");
  };

  const onShapeSelect: MarqueeProps["onSelect"] = (id, type) => {
    selectShape?.exec([id], type);
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
