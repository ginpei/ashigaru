import { ComponentPropsWithoutRef } from "react";

export type NiceListProps = ComponentPropsWithoutRef<"ul">;

/**
 * `<ul>`
 */
export function NiceUL({ className, children }: NiceListProps): JSX.Element {
  return (
    <div className={`NiceList ${className} m-4 ml-8 list-disc`}>{children}</div>
  );
}
