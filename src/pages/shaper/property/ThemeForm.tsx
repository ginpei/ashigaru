import { ChangeEventHandler, useCallback } from "react";
import { NiceCode } from "../../../domains/nice/NiceCode";
import { NiceColorInput } from "../../../domains/nice/NiceColorInput";
import { ShapeData } from "../shape/ShapeData";
import { PropertyLabelRow } from "./PropertyLabelRow";

export interface ThemeFormProps {
  shape: Partial<ShapeData>;
  onChange: (shape: Partial<ShapeData>) => void;
}

export function ThemeForm({
  shape,
  onChange,
}: ThemeFormProps): React.JSX.Element {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (!isObjectKey(shape, name)) {
        throw new Error(`Invalid key: ${name}`);
      }

      onChange({ [name]: value });
    },
    [onChange, shape],
  );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h3 className="font-bold">Theme</h3>
      <PropertyLabelRow ambiguous={shape.color === undefined}>
        <span>Color</span>
        <span>
          <NiceColorInput
            className="size-6"
            name="color"
            onChange={onInputChange}
            value={shape.color ?? "#000000"}
          />{" "}
          {shape.color && <NiceCode>{shape.color}</NiceCode>}
        </span>
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
