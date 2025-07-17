import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-xs font-light">{label}</label>}
        <input
          ref={ref}
          data-slot="input"
          className={cn(
            "placeholder:text-muted-foreground h-8 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
