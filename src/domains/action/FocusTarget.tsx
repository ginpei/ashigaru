export interface FocusTargetProps {
  children: React.ReactNode;
  id: string;
}

export function FocusTarget({ children, id }: FocusTargetProps): JSX.Element {
  return (
    <div className="FocusTarget contents" data-focus-target={id} tabIndex={-1}>
      {children}
    </div>
  );
}
