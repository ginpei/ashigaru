import { ComponentProps } from "react";

export type HStackProps = ComponentProps<"div"> & {
  gap?: string;
};

export function VStack({
  className = "",
  gap = "",
  style = {},
  ...props
}: HStackProps): JSX.Element {
  if (gap) {
    style.gap = gap;
  }

  return (
    <div
      className={`VStack flex flex-col gap-4 ${className}`}
      style={style}
      {...props}
    />
  );
}
