import { NiceH2 } from "../../../domains/nice/NiceH";
import { ShapeData } from "../shape/ShapeData";
import { useShapeData } from "../shape/shapeDataContext";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const data = useShapeData();

  return (
    <div className="ListPane bg-white">
      <h2 className="font-bold">Shapes</h2>
      <div className="h-full border-t bg-gray-100">
        {data.map((data) => (
          <ShapeListItem key={data.id} data={data} />
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
