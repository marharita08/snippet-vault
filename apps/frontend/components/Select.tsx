import React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/utils/cn";

import { Label } from "./Label";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  label?: string;
  value?: string;
  error?: boolean;
  startIcon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, label, error, startIcon, ...props }, ref) => {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      )}
      <div className="relative w-full">
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(
            "cursor-pointer flex gap-2 h-[42px] w-full text-body-15 text-neutral-900 items-center justify-between rounded-md border border-input-border hover:border-input-border-hover bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[state=open]:border-primary shadow-inner-bottom focus:outline-none group",
            error &&
              "border-error data-[state=open]:border-error hover:border-error",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {startIcon && (
              <div className="left-3 flex items-center cursor-pointer text-neutral-700 group-data-[state=open]:text-primary shrink-0 w-[18px] h-[18px]">
                {startIcon}
              </div>
            )}
            {children || <SelectValue placeholder=" " />}
          </div>
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-[#1C222E] transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary shrink-0",
                error && "text-error group-data-[state=open]:text-error",
              )}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      </div>
    </div>
  );
});

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> {
  viewportClassName?: string;
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    { className, children, position = "popper", viewportClassName, ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 min-w-8rem rounded-md border bg-background shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) max-w-(--radix-select-trigger-width)",
            viewportClassName,
          )}
        >
          <div className="max-h-[158px] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-body-15 text-neutral-800 outline-none data-highlighted:bg-neutral-50 data-disabled:pointer-events-none data-disabled:opacity-50 focus:bg-neutral-50 hover:bg-primary/10",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText asChild>
      <span className="block truncate flex-1 min-w-0">{children}</span>
    </SelectPrimitive.ItemText>

    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center shrink-0">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
