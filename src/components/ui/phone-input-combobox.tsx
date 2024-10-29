import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { isoToEmoji } from "@/lib/phone-input-helpers";
import { Button } from "./button";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type ComboboxCountryInputProps<T extends Option> = {
  value: T;
  onValueChange: (value: T) => void;
  options: T[];
  renderOption: ({
    option,
    isSelected,
  }: {
    option: T;
    isSelected: boolean;
  }) => React.ReactNode;
  renderValue: (option: T) => string;
  emptyMessage: string;
  placeholder?: string;
  className?: string;
};

export function ComboboxCountryInput<T extends Option>({
  value,
  onValueChange,
  options,
  renderOption,
  renderValue,
  placeholder,
  emptyMessage,
}: ComboboxCountryInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          variant={"outline"}
          className="inline-flex h-10 items-center justify-between self-start text-sm font-medium ring-offset-white transition-colors disabled:pointer-events-none disabled:opacity-50 "
        >
          {value.value ? isoToEmoji(value.value) : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 pb-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup className="mt-2 h-full max-h-48 overflow-auto p-0 [&_div[cmdk-group-items]]:flex [&_div[cmdk-group-items]]:flex-col [&_div[cmdk-group-items]]:gap-1">
              {options.map((option) => {
                const isSelected = value.value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={renderValue(option)}
                    onSelect={() => {
                      onValueChange(option);
                      setOpen(false);
                    }}
                  >
                    {renderOption({ option, isSelected: isSelected })}
                    {isSelected ? (
                      <Check className="ml-auto mr-2 h-4 w-4" />
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
