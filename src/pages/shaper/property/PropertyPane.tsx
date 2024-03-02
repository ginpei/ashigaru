import { ChangeEventHandler, useCallback } from "react";
import { NiceInput } from "../../../domains/nice/NiceInput";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { LayoutForm } from "./LayoutForm";
import { ShapeData } from "../shape/ShapeData";

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
      <h2>Properties</h2>
      {editingShape ? (
        <div className="flex gap-8">
          <LayoutForm shape={editingShape} onChange={onFormChange} />
        </div>
      ) : (
        <p>Select one shape to edit.</p>
      )}
    </div>
  );
}
