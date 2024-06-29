export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): React.JSX.Element {
  return (
    <div className="Container mx-auto w-full max-w-4xl px-4">{children}</div>
  );
}
