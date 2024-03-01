import { CanvasData } from "./CanvasData";
import { ShaperCanvas } from "./ShaperCanvas";

export function CanvasPane(): JSX.Element {
  const data: CanvasData[] = [
    {
      color: "red",
      height: 100,
      id: "1",
      left: 0,
      top: 0,
      width: 100,
    },
    {
      color: "blue",
      height: 100,
      id: "2",
      left: 100,
      top: 0,
      width: 100,
    },
  ];
  return (
    <div className="CanvasPane">
      <ShaperCanvas data={data} />
    </div>
  );
}
