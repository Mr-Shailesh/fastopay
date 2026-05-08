"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-full w-full min-w-0 bg-transparent text-slate-950 outline-none placeholder:text-slate-400 disabled:pointer-events-none disabled:text-slate-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
