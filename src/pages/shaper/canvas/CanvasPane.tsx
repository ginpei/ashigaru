import { MouseEventHandler, useCallback, useState } from "react";
import { FocusTarget } from "../../../domains/action/FocusTarget";
import { DragHandlers } from "../../../domains/pointer/dragHooks";
import { useCommand } from "../../../domains/action/commandContext";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";
import { Marquee, MarqueeProps } from "./Marquee";
import { ShapeDisplay } from "./ShapeDisplay";

export function CanvasPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();
  const selectShape = useCommand("selectShape");
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  const selectedShapes = shapes.filter((shape) =>
    selectedShapeIds.includes(shape.id),
  );

  const onMarqueeDragMove: DragHandlers["onMove"] = useCallback((dx, dy) => {
    setDx(dx);
    setDy(dy);
  }, []);

  const onMarqueeDragEnd: DragHandlers["onEnd"] = useCallback(
    (dx, dy, ok) => {
      setDx(0);
      setDy(0);
      if (!ok) {
        return;
      }

      setState((state) => {
        const shapes = state.shapes.map((shape) => {
          if (!selectedShapeIds.includes(shape.id)) {
            return shape;
          }

          const newShape: ShapeData = {
            ...shape,
            left: shape.left + dx,
            top: shape.top + dy,
          };
          return newShape;
        });
        return { ...state, shapes };
      });
    },
    [selectedShapeIds, setState],
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
    <FocusTarget id="canvas">
      <div
        className="
          CanvasPane
          relative size-full overflow-auto border bg-gray-50
          focus-within:bg-gray-200
          [:focus_&]:bg-gray-200
        "
        onMouseDown={onCanvasClick}
      >
        <div className="absolute p-4">
          <div
            className="
              relative border-4 border-gray-500 bg-white
              shadow-[0_0_16px_4px] shadow-gray-500/50
            "
            onMouseDown={onCanvasClick}
            style={{ height: "600px", width: "800px" }}
          >
            {shapes.map((data) => (
              <ShapeDisplay
                dx={selectedShapeIds.includes(data.id) ? dx : 0}
                dy={selectedShapeIds.includes(data.id) ? dy : 0}
                key={data.id}
                onSelect={onShapeSelect}
                shape={data}
              />
            ))}
            {selectedShapes.map((data) => (
              <Marquee
                dx={dx}
                dy={dy}
                key={data.id}
                onDragMove={onMarqueeDragMove}
                onDragEnd={onMarqueeDragEnd}
                onSelect={onShapeSelect}
                shape={data}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusTarget>
  );
}
