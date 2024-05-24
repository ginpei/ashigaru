export interface FocusTargetProps {
  children: React.ReactNode;
  id: string;
}

/**
 * TODO remove this
 * @deprecated Use `string` instead
 */
export type FocusTargetId = `${string}Focus`;

export function FocusTarget({ children, id }: FocusTargetProps): JSX.Element {
  return (
    <div className="FocusTarget contents" data-focus-target={id} tabIndex={-1}>
      {children}
    </div>
  );
}
