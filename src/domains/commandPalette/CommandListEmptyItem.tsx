export interface CommandListEmptyItemProps {
  children: React.ReactNode;
}

export function CommandListEmptyItem({
  children,
}: CommandListEmptyItemProps): JSX.Element {
  return (
    <li className="CommandListEmptyItem px-2 py-1 leading-4 cursor-default">
      <small className="text-slate-500">{children}</small>
    </li>
  );
}
