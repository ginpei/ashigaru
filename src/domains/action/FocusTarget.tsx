export interface FocusTargetProps {
  children: React.ReactNode;
  id: FocusTargetId;
}

export type FocusTargetId = `${string}Focus`;

export function FocusTarget({ children, id }: FocusTargetProps): JSX.Element {
  return (
    <div className="FocusTarget contents" data-focus-target={id} tabIndex={-1}>
      {children}
    </div>
  );
}
