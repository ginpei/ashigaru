import { ChangeEventHandler, useCallback } from "react";
import { NiceInput } from "../../../domains/nice/NiceInput";
import { ShapeData } from "../shape/ShapeData";

export interface GeneralFormProps {
  shape: ShapeData;
  onChange: (shape: ShapeData) => void;
}

export function GeneralForm({
  shape,
  onChange,
}: GeneralFormProps): JSX.Element {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
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
      <label className="grid grid-cols-2">
        <span>ID</span>
        <NiceInput name="id" readOnly type="text" value={shape.id} />
      </label>
      <label className="grid grid-cols-2">
        <span>Name</span>
        <NiceInput
          name="name"
          onChange={onInputChange}
          type="text"
          value={shape.name}
        />
      </label>
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
