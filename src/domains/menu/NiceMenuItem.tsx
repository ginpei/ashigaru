import { Menu } from "@headlessui/react";
import { ReactNode } from "react";

export interface NiceMenuItemProps {
  disabled?: boolean;
  children: ReactNode;
}

export function NiceMenuItem({
  disabled,
  children,
}: NiceMenuItemProps): JSX.Element {
  return (
    <Menu.Item disabled={disabled}>
      {({ active, disabled }) => (
        <button
          className={`border-b p-2 text-start ${
            active && "bg-blue-500 text-white"
          } ${disabled && "text-gray-400"}`}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
