import { ComponentPropsWithoutRef } from "react";
import { NiceInput } from "./NiceInput";

export interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

export function TextField({
  className,
  label,
  ...props
}: TextFieldProps): JSX.Element {
  return (
    <label className="TextField flex flex-col gap-1">
      <span className="text-sm">{label}</span>
      <NiceInput {...props} />
    </label>
  );
}
