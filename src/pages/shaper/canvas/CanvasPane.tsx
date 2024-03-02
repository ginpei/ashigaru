import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShaperCanvas } from "./ShaperCanvas";

export function CanvasPane(): JSX.Element {
  const [{ shapes }] = useShaperPageStateContext();

  return (
    <div className="CanvasPane">
      <ShaperCanvas data={shapes} />
    </div>
  );
}
