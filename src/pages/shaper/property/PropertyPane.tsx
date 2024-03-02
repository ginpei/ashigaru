import { useCallback } from "react";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";
import { GeneralForm } from "./GeneralForm";
import { LayoutForm } from "./LayoutForm";

export function PropertyPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();
  const currentShapes = shapes.filter((shape) =>
    selectedShapeIds.includes(shape.id),
  );
  const editingShape = currentShapes.length === 1 ? currentShapes[0] : null;

  const onFormChange = useCallback(
    (shape: ShapeData) => {
      setState((state) => {
        const newShapes = state.shapes.map((s) =>
          s.id === shape.id ? shape : s,
        );
        return { ...state, shapes: newShapes };
      });
    },
    [setState],
  );

  return (
    <div className="PropertyPane bg-gray-100">
      {editingShape ? (
        <div className="flex flex-col gap-4">
          <h2 className="px-4 pt-4 text-sm font-bold">Properties</h2>
          <GeneralForm shape={editingShape} onChange={onFormChange} />
          <LayoutForm shape={editingShape} onChange={onFormChange} />
        </div>
      ) : (
        <p>Select one shape to edit.</p>
      )}
    </div>
  );
}
