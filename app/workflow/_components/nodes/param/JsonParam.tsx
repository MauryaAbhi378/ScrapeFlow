import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { useId, useState } from "react";

function JsonParam({ param, value, updateNodeParamValue }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const id = useId();

  return (
    <div className="w-full space-y-1 p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="px-2 text-red-400">*</p>}
      </Label>
      <Textarea
        id={id}
        className="min-h-20 text-xs"
        value={internalValue}
        placeholder='{"key":"value"}'
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="px-2 text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}

export default JsonParam;
