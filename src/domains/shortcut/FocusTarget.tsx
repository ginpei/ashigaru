export interface FocusTargetProps {
  children: React.ReactNode;
  id: `${string}Focus`;
}

export function FocusTarget({ children, id }: FocusTargetProps): JSX.Element {
  return (
    <div className="FocusTarget contents" data-focus-target={id}>
      {children}
    </div>
  );
}
