import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChangeEventHandler } from "react";
import { FocusTarget } from "../action/FocusTarget";
import { CommandListEmptyItem } from "./CommandListEmptyItem";

export interface CommandPaletteFrameProps<Value> {
  emptyMessage: (() => React.ReactNode) | string;
  focusTargetId: string;
  getKey: (value: Value) => string;
  input: string;
  onInput: (input: string) => void;
  onSelect: CommandPaletteSelectHandler<Value>;
  open: boolean;
  options: Readonly<Value[]>;
  renderItem: (value: Value, index: number) => React.ReactNode;
}

export interface CommandPaletteOption {
  id: string;
  title: string;
}

export type CommandPaletteSelectHandler<T> = (command: T | null) => void;

export function CommandPaletteFrame<Value>({
  emptyMessage,
  focusTargetId,
  getKey,
  input,
  onInput,
  onSelect,
  open,
  options,
  renderItem,
}: CommandPaletteFrameProps<Value>): React.JSX.Element {
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
          <DialogPanel className="w-full max-w-sm rounded bg-white">
            <DialogTitle className="hidden">Command pallet</DialogTitle>
            <Combobox<Value> onChange={onComboboxChange}>
              <div className="flex [&>*]:flex-1">
                <ComboboxInput
                  autoFocus
                  className="border-[1px] border-ginpei px-4 py-1 text-black"
                  onChange={onInputChange}
                  value={input}
                />
              </div>
              <ComboboxOptions
                className="max-h-[50vh] overflow-auto"
                data-headlessui-state="open"
                static
              >
                {options.map((option, index) => (
                  <ComboboxOption
                    className={({ focus }) => `
                      px-2 py-1 flex place-content-between leading-4 cursor-pointer
                      hover:bg-slate-300
                      ${focus ? "bg-slate-300" : "bg-white"}
                    `}
                    key={getKey(option)}
                    value={option}
                  >
                    {renderItem(option, index)}
                  </ComboboxOption>
                ))}
                {options.length < 1 &&
                  (typeof emptyMessage === "string" ? (
                    <CommandListEmptyItem>{emptyMessage}</CommandListEmptyItem>
                  ) : (
                    emptyMessage()
                  ))}
              </ComboboxOptions>
            </Combobox>
          </DialogPanel>
        </div>
      </FocusTarget>
    </Dialog>
  );
}
