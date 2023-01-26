import { Combobox, Dialog } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { FocusTarget, FocusTargetId } from "../shortcut/FocusTarget";
import { CommandListItem } from "./CommandListItem";

export interface CommandPaletteFrameProps<
  Value extends { id: string },
  FilteredValue extends Value = Value
> {
  filter: (input: string, values: Value[]) => FilteredValue[];
  focusTargetId: FocusTargetId;
  onSelect: CommandPaletteSelectHandler<Value>;
  open: boolean;
  options: Value[];
  renderEmptyItem: () => React.ReactNode;
  renderItem: (value: Value, index: number) => React.ReactNode;
}

export type CommandPaletteSelectHandler<T> = (command: T | null) => void;

export function CommandPaletteFrame<
  Value extends { id: string },
  FilteredValue extends Value = Value
>({
  filter,
  focusTargetId,
  onSelect,
  open,
  options,
  renderEmptyItem,
  renderItem,
}: CommandPaletteFrameProps<Value, FilteredValue>): JSX.Element {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    return filter(input, options);
  }, [filter, input, options]);

  useEffect(() => {
    setInput("");
  }, [open]);

  const onDialogClose = () => onSelect(null);

  const onComboboxChange = (option: Value) => {
    onSelect(option);
  };

  return (
    <Dialog className="CommandPalletFrame" onClose={onDialogClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <FocusTarget id={focusTargetId}>
        <div className="fixed w-full top-0 mx-auto flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <Dialog.Title className="hidden">Command pallet</Dialog.Title>
            <Combobox<Value> onChange={onComboboxChange}>
              <div className="flex [&>*]:flex-1">
                <Combobox.Input
                  className="border-[1px] border-ginpei px-4 py-1 text-black"
                  onChange={(v) => setInput(v.currentTarget.value)}
                  value={input}
                />
              </div>
              <Combobox.Options data-headlessui-state="open" static>
                {filteredOptions.map((option, index) => (
                  <Combobox.Option key={option.id} value={option}>
                    {({ active }) => (
                      <div
                        className={`
                        px-2 py-1 flex place-content-between leading-4 cursor-pointer
                        hover:bg-slate-300
                        ${active ? "bg-slate-300" : "bg-white"}
                      `}
                      >
                        {renderItem(option, index)}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
                {filteredOptions.length < 1 && (
                  <li className="px-2 py-1 leading-4 cursor-default">
                    {renderEmptyItem()}
                  </li>
                )}
              </Combobox.Options>
            </Combobox>
          </Dialog.Panel>
        </div>
      </FocusTarget>
    </Dialog>
  );
}
