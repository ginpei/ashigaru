import { CanvasData } from "./CanvasData";

export interface ShaperCanvasProps {
  data: CanvasData[];
}

export function ShaperCanvas({ data }: ShaperCanvasProps): JSX.Element {
  return (
    <div className="ShaperCanvas relative">
      {data.map((data) => (
        <div key={data.id} style={canvasDataToStyle(data)} />
      ))}
    </div>
  );
}

function canvasDataToStyle(data: CanvasData): React.CSSProperties {
  return {
    backgroundColor: data.color,
    height: data.height,
    left: data.left,
    position: "absolute",
    top: data.top,
    width: data.width,
  };
}
