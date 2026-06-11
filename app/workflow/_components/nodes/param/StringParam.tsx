import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const id = useId();
  const isLargeInput = param.rows ? true : false;
  const rows = param.rows as number  || 3;

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      {isLargeInput ? (
        <Textarea
          id={id}
          className="text-xs"
          value={internalValue ?? ""}
          placeholder="Enter value here"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(e.target.value)}
          style={{ minHeight: `${rows * 1.5}rem` }}
        />
      ) : (
        <Input
          id={id}
          className="text-xs"
          value={internalValue ?? ""}
          placeholder="Enter value here"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(e.target.value)}
        />
      )}
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
