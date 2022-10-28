export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="Container mx-auto max-w-4xl px-4">
      {children}
    </div>
  );
}
