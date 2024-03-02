import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [{ shapes }] = useShaperPageStateContext();

  return (
    <div className="ListPane bg-white">
      <h2 className="font-bold">Shapes</h2>
      <div className="h-full border-t bg-gray-100">
        {shapes.map((shape) => (
          <ShapeListItem key={shape.id} data={shape} />
        ))}
      </div>
    </div>
  );
}

function ShapeListItem(props: { data: ShapeData }): JSX.Element {
  return (
    <div className="border-b bg-white p-2">
      <div>{props.data.name}</div>
    </div>
  );
}
