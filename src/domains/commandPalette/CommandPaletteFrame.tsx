import { Combobox, Dialog } from "@headlessui/react";
import { ChangeEventHandler } from "react";
import { FocusTarget, FocusTargetId } from "../action/FocusTarget";

export interface CommandPaletteFrameProps<Value> {
  focusTargetId: FocusTargetId;
  getKey: (value: Value) => string;
  input: string;
  onInput: (input: string) => void;
  onSelect: CommandPaletteSelectHandler<Value>;
  open: boolean;
  options: Readonly<Value[]>;
  renderEmptyItem: () => React.ReactNode;
  renderItem: (value: Value, index: number) => React.ReactNode;
}

export interface CommandPaletteOption {
  id: string;
  title: string;
}

export type CommandPaletteSelectHandler<T> = (command: T | null) => void;

export function CommandPaletteFrame<Value>({
  focusTargetId,
  getKey,
  input,
  onInput,
  onSelect,
  open,
  options,
  renderEmptyItem,
  renderItem,
}: CommandPaletteFrameProps<Value>): JSX.Element {
  const onDialogClose = () => onSelect(null);

  const onComboboxChange = (option: Value) => {
    onSelect(option);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value;
    onInput(value);
  };

  return (
    <Dialog className="CommandPalletFrame" onClose={onDialogClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <FocusTarget id={focusTargetId}>
        <div className="fixed top-0 mx-auto flex w-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <Dialog.Title className="hidden">Command pallet</Dialog.Title>
            <Combobox<Value> onChange={onComboboxChange}>
              <div className="flex [&>*]:flex-1">
                <Combobox.Input
                  className="border-[1px] border-ginpei px-4 py-1 text-black"
                  onChange={onInputChange}
                  value={input}
                />
              </div>
              <Combobox.Options
                className="max-h-[50vh] overflow-auto"
                data-headlessui-state="open"
                static
              >
                {options.map((option, index) => (
                  <Combobox.Option
                    className={({ active }) => `
                      px-2 py-1 flex place-content-between leading-4 cursor-pointer
                      hover:bg-slate-300
                      ${active ? "bg-slate-300" : "bg-white"}
                    `}
                    key={getKey(option)}
                    value={option}
                  >
                    {renderItem(option, index)}
                  </Combobox.Option>
                ))}
                {options.length < 1 && renderEmptyItem()}
              </Combobox.Options>
            </Combobox>
          </Dialog.Panel>
        </div>
      </FocusTarget>
    </Dialog>
  );
}
