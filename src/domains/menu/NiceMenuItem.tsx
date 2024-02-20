import { Menu } from "@headlessui/react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export type NiceMenuItemProps = ButtonProps | LinkProps;

type ButtonProps = ComponentPropsWithoutRef<"button">;

type LinkProps = ComponentPropsWithoutRef<"a"> & { disabled?: boolean };

export function NiceMenuItem(props: NiceMenuItemProps): JSX.Element {
  return (
    <Menu.Item disabled={props.disabled}>
      {({ active, disabled }) =>
        isButtonProps(props) ? (
          <button
            className={`border-b p-2 text-start no-underline ${
              !active && !disabled && "text-inherit"
            } ${active && "bg-blue-500 text-white"} ${
              disabled && "text-gray-400"
            }`}
            disabled={disabled}
            {...props}
          />
        ) : (
          <a
            className={`border-b p-2 text-start no-underline ${
              !active && !disabled && "text-inherit"
            } ${active && "bg-blue-500 text-white"} ${
              disabled && "text-gray-400"
            }`}
            {...props}
          />
        )
      }
    </Menu.Item>
  );
}

function isButtonProps(props: NiceMenuItemProps): props is ButtonProps {
  return props.disabled || !("href" in props);
}
