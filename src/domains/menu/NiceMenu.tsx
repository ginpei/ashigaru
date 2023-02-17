import { Menu } from "@headlessui/react";
import { ReactNode, useEffect, useRef } from "react";
import { calcFloatingStyle, useFloatingStyle } from "./floatManipulator";

export interface NiceMenuProps {
  elRef: HTMLElement | null;
  onBlur: () => void;
  open: boolean;
}

export function NiceMenu({ elRef, onBlur, open }: NiceMenuProps): JSX.Element {
  const [style, setStyle] = useFloatingStyle();
  const refMenu = useRef<HTMLDivElement>(null);
  const refArrow = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elRef || !refMenu.current) {
      return;
    }

    calcFloatingStyle(elRef, refMenu.current, refArrow.current).then(
      (newStyle) => {
        console.log("# newStyle", newStyle);
        setStyle(newStyle);
        refMenu.current?.focus();
      }
    );
  }, [elRef, open, setStyle]);

  if (!open) {
    return <></>;
  }

  return (
    <Menu>
      <Menu.Items
        className="absolute shadow-lg border bg-white flex flex-col"
        ref={refMenu}
        onBlur={onBlur}
        onFocus={() => console.log(`# focus`)}
        static
        style={style}
      >
        <Menu.Item>
          {({ active }) => (
            <a
              className={`border-b p-2 no-underline ${
                active ? "bg-blue-500 text-white" : "text-inherit"
              }`}
              href="#demo-link"
            >
              Demo link
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`border-b p-2 text-start ${
                active && "bg-blue-500 text-white"
              }`}
              onClick={() => console.log(`# click`)}
            >
              Documentation
            </button>
          )}
        </Menu.Item>
        <MenuItem disabled>Invite a friend (coming soon!)</MenuItem>
      </Menu.Items>
    </Menu>
  );
}

interface MenuItemProps {
  disabled?: boolean;
  children: ReactNode;
}

function MenuItem({ disabled, children }: MenuItemProps): JSX.Element {
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
