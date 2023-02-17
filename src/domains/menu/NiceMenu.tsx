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
        <NiceMenuItem href="#demo-link">Demo link</NiceMenuItem>
        <NiceMenuItem onClick={() => console.log(`# click`)}>
          Documentation
        </NiceMenuItem>
        <NiceMenuItem disabled>Invite a friend (coming soon!)</NiceMenuItem>
      </Menu.Items>
    </Menu>
  );
}
