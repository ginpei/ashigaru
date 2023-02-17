import { Menu } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { calcFloatingStyle, useFloatingStyle } from "./floatManipulator";
import { NiceMenuItem } from "./NiceMenuItem";

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
        <NiceMenuItem disabled>Invite a friend (coming soon!)</NiceMenuItem>
      </Menu.Items>
    </Menu>
  );
}
