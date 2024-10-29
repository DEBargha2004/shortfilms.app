"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type MultiSelectItemProps = string;

function MultiSelect({
  options,
  values,
  onValueChange,
  placeholder = "Select options",
  custom = true,
}: {
  options: MultiSelectItemProps[];
  values: MultiSelectItemProps[];
  onValueChange: (values: MultiSelectItemProps[]) => void;
  placeholder?: string;
  custom?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectablesGroupRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<MultiSelectItemProps[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const selectables = React.useMemo(() => {
    return options.filter((o) => !selected.some((s) => s === o));
  }, [options, selected]);

  const handleUnselect = React.useCallback(
    (value: string) => {
      const newSelected = selected.filter((s) => s !== value);

      setSelected(newSelected);
      onValueChange(newSelected);
    },
    [selected],
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      const newSelected = [...selected, options.find((o) => o === value)!];

      setSelected(newSelected);
      onValueChange(newSelected);
    },
    [options, selected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
            onValueChange(newSelected);
          }
        }
        if (e.key === "Enter") {
          e.stopPropagation();
          const isSelectable = selectables.some((s) => s === input.value);
          if (!isSelectable && custom && input.value) {
            onValueChange([...selected, input.value]);
            setSelected((prev) => [...prev, input.value]);
            setInputValue("");
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected],
  );

  React.useEffect(() => {
    setSelected(values);
  }, [values]);

  React.useEffect(() => {
    const selectablesGroup = selectablesGroupRef.current;
    if (open && selectablesGroup) {
      const groupDimension = selectablesGroup.getBoundingClientRect();

      selectablesGroup.style.removeProperty("top");
      selectablesGroup.style.removeProperty("bottom");

      // 30 is added to account for the gap between the selectables and the input box
      // and the margin of the input box
      if (
        groupDimension.top + groupDimension.height + 30 >
        window.innerHeight
      ) {
        selectablesGroup.style.bottom = `50px`;
        console.log("here");
      } else {
        console.log("here2");
        selectablesGroup.style.top = `50px`;
      }
    }

    return () => {
      selectablesGroup?.style.removeProperty("top");
      selectablesGroup?.style.removeProperty("bottom");
    };
  }, [open, selectables]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-background relative"
    >
      <div className="group rounded-md border border-input p-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected?.map((item) => {
            return (
              <Badge key={item} variant="secondary" className="rounded">
                {item}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="absolute w-full h-fit z-50" ref={selectablesGroupRef}>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className=" top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      value={item}
                      onSelect={(value) => {
                        setInputValue("");
                        handleSelect(value);
                      }}
                      className={"cursor-pointer"}
                    >
                      {item}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

export { MultiSelect, type MultiSelectItemProps };
