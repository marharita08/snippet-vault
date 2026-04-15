import * as React from "react";

import { ChevronDown, X } from "lucide-react";

import { cn } from "@/utils/cn";

import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface TagsInputProps {
  values: string[];
  setValues: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  inputPlaceholder?: string;
  error?: boolean;
}

const TagsInput = ({
  values,
  setValues,
  label,
  placeholder = "Select tags...",
  inputPlaceholder = "Enter tag name",
  error,
}: TagsInputProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const id = React.useId();

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValues(values.filter((v) => v !== value));
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      setValues([...values, inputValue]);
      setInputValue("");
    }
  };

  const content = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <div
            id={id}
            className={cn(
              "cursor-pointer flex min-h-[42px] w-full text-base md:text-body-15 text-neutral-900 items-center justify-between rounded-md border border-input-border hover:border-input-border-hover bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 shadow-inner-bottom focus:outline-none group",
              "h-fit",
              error && "border-error hover:border-error",
              open && "border-primary hover:border-primary",
            )}
          >
            <div className="flex flex-wrap gap-2">
              {values.length > 0 ? (
                values.map((value) => (
                  <div
                    key={value}
                    className="bg-primary/10 rounded-lg px-[6px] py-[1.5px] text-body-15 text-neutral-800 flex items-center"
                  >
                    {value}
                    <Button
                      variant="ghost"
                      className="w-[18px] h-[18px] ml-1"
                      onClick={(e) => handleRemove(value, e)}
                    >
                      <X className="h-[14px] w-[14px]" />
                    </Button>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground/50">{placeholder}</span>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-[#1C222E] transition-transform ",
                open && "rotate-180 text-primary",
              )}
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        className="z-50 mt-1 rounded-md border bg-background shadow-md p-1 max-h-[158px] overflow-y-auto min-w-(--radix-popover-trigger-width)"
      >
        <div className="flex items-center gap-2 px-4 py-3">
          <Input
            placeholder={inputPlaceholder}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  if (label) {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
        {content}
      </div>
    );
  }

  return content;
};

export { TagsInput };
