import { ChangeEventHandler, useCallback } from "react";
import { NiceInput } from "../../../domains/nice/NiceInput";
import { ShapeData } from "../shape/ShapeData";
import { PropertyLabelRow } from "./PropertyRow";

export interface LayoutFormProps {
  shape: Partial<ShapeData>;
  onChange: (shape: Partial<ShapeData>) => void;
}

export function LayoutForm({ shape, onChange }: LayoutFormProps): JSX.Element {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, valueAsNumber: value } = event.target;
      if (!isObjectKey(shape, name)) {
        throw new Error(`Invalid key: ${name}`);
      }

      onChange({ [name]: value });
    },
    [onChange, shape],
  );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h3 className="font-bold">Layout</h3>
      <PropertyLabelRow ambiguous={shape.top === undefined}>
        <span>Top</span>
        <NiceInput
          name="top"
          onChange={onInputChange}
          type="number"
          value={shape.top ?? ""}
        />
      </PropertyLabelRow>
      <PropertyLabelRow ambiguous={shape.left === undefined}>
        <span>Left</span>
        <NiceInput
          name="left"
          onChange={onInputChange}
          type="number"
          value={shape.left ?? ""}
        />
      </PropertyLabelRow>
      <PropertyLabelRow ambiguous={shape.width === undefined}>
        <span>Width</span>
        <NiceInput
          name="width"
          onChange={onInputChange}
          type="number"
          value={shape.width ?? ""}
        />
      </PropertyLabelRow>
      <PropertyLabelRow ambiguous={shape.height === undefined}>
        <span>Height</span>
        <NiceInput
          name="height"
          onChange={onInputChange}
          type="number"
          value={shape.height ?? ""}
        />
      </PropertyLabelRow>
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
