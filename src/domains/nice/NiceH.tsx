import { ComponentPropsWithoutRef } from "react";

export function NiceH1({
  className,
  ...props
}: ComponentPropsWithoutRef<"h1">): JSX.Element {
  return <h1 className={`NiceH ${className} text-5xl font-bold`} {...props} />;
}

export function NiceH2({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">): JSX.Element {
  return <h2 className={`NiceH ${className} text-3xl font-bold`} {...props} />;
}

export function NiceH3({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">): JSX.Element {
  return <h3 className={`NiceH ${className} text-xl font-bold`} {...props} />;
}
