export interface CommandListEmptyItemProps {
  children: React.ReactNode;
}

export function CommandListEmptyItem({
  children,
}: CommandListEmptyItemProps): React.JSX.Element {
  return (
    <li className="CommandListEmptyItem cursor-default px-2 py-1 leading-4">
      <small className="text-slate-500">{children}</small>
    </li>
  );
}
