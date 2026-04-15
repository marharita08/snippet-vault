import * as React from "react";

import { cn } from "@/utils/cn";

import { Label } from "./Label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, placeholder, error, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label htmlFor={id} className="cursor-pointer">
            {label}
          </Label>
        )}
        <div className="relative w-full">
          <textarea
            id={id}
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input hover:border-input-border-hover shadow-inner-bottom bg-background px-3 py-2 text-base md:text-body-15 placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-error focus-visible:border-error hover:border-error",
              className,
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
