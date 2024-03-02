export interface PropertyLabelRowProps {
  ambiguous: boolean;
  children: React.ReactNode;
}

export function PropertyLabelRow({
  ambiguous,
  children,
}: PropertyLabelRowProps): JSX.Element {
  return (
    <label
      className={`PropertyLabelRow
      grid grid-cols-2 ${ambiguous ? "bg-yellow-50" : ""}
    `}
    >
      {children}
    </label>
  );
}
