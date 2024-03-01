import { CSSProperties, HTMLAttributes } from "react";

export interface GridFrameProps {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  gap?: CSSProperties["gap"];
  gridTemplate: CSSProperties["gridTemplate"];
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export function GridFrame({
  children,
  className,
  gap,
  gridTemplate,
  style,
}: GridFrameProps): JSX.Element {
  return (
    <div
      className={`GridFrame grid ${className}`}
      style={{ ...style, gap, gridTemplate }}
    >
      {children}
    </div>
  );
}

export function GridArea(props: {
  children: React.ReactNode;
  area: CSSProperties["gridArea"];
}): JSX.Element {
  return (
    <div className="GridArea contents" style={{ gridArea: props.area }}>
      {props.children}
    </div>
  );
}
