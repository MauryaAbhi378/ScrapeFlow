"use client";

import { ParamProps } from "@/types/appNode";

export default function BrowserInstanceParam({ param }: ParamProps) {
  return (
    <div className="w-full space-y-1 p-1">
      <p className="text-xs font-medium">{param.name}</p>
      {param.helperText && (
        <p className="text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}
