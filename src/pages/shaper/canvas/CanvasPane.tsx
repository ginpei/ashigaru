import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShaperCanvas } from "./ShaperCanvas";

export function CanvasPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }] = useShaperPageStateContext();

  return (
    <div className="CanvasPane">
      <ShaperCanvas selectedIds={selectedShapeIds} data={shapes} />
    </div>
  );
}
