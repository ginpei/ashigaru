import { ChangeEventHandler, useCallback } from "react";
import { NiceInput } from "../../../domains/nice/NiceInput";
import { ShapeData } from "../shape/ShapeData";
import { PropertyLabelRow } from "./PropertyLabelRow";

export interface GeneralFormProps {
  shapes: ShapeData[];
  onChange: (shape: ShapeData) => void;
}

export function GeneralForm({
  shapes,
  onChange,
}: GeneralFormProps): JSX.Element {
  const shape: ShapeData | null = shapes.length === 1 ? shapes[0] : null;

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!shape) {
        throw new Error(`Shape is null`);
      }

      const { name, value } = event.target;
      if (!isObjectKey(shape, name)) {
        throw new Error(`Invalid key: ${name}`);
      }

      onChange({ ...shape, [name]: value });
    },
    [onChange, shape],
  );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h3 className="font-bold">General</h3>
      {shape ? (
        <>
          <PropertyLabelRow ambiguous={false}>
            <span>ID</span>
            <NiceInput name="id" readOnly type="text" value={shape.id} />
          </PropertyLabelRow>
          <PropertyLabelRow ambiguous={false}>
            <span>Name</span>
            <NiceInput
              name="name"
              onChange={onInputChange}
              type="text"
              value={shape.name}
            />
          </PropertyLabelRow>
        </>
      ) : (
        <p>
          {shapes.length} shapes selected:{" "}
          {shapes.map((v) => v.name).join(", ")}
        </p>
      )}
    </div>
  );
}

// TODO extract
function isObjectKey<T extends object>(
  object: T,
  key: keyof any,
): key is keyof T {
  return key in object;
}
