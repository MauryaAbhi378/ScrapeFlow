"use client";

import { GetCredentialsForUser } from "@/actions/credentials/getCredentialsForUser";
import { ParamProps } from "@/types/appNode";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function CredentialParam({ param, value, updateNodeParamValue }: ParamProps) {
  const { data: credentials, isLoading } = useQuery({
    queryKey: ["credentials"],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10000, // Refetch every 10s to keep dropdown updated
  });

  // Set default value to first credential if none selected
  useEffect(() => {
    if (credentials && credentials.length > 0 && !value) {
      updateNodeParamValue(credentials[0].id);
    }
  }, [credentials, value, updateNodeParamValue]);

  if (isLoading) {
    return (
      <div className="space-y-2 w-full">
        <Label className="text-xs flex items-center gap-1">
          {param.name}
          {param.required && <span className="text-red-500">*</span>}
        </Label>
        <div className="h-10 rounded-md border animate-pulse bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-2 w-full">
      <Label className="text-xs flex items-center gap-1">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={updateNodeParamValue}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              credentials && credentials.length > 0
                ? "Select a credential"
                : "No credentials available"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {credentials && credentials.length > 0 ? (
            credentials.map((credential) => (
              <SelectItem key={credential.id} value={credential.id}>
                {credential.name}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground text-center">
              No credentials available. Create one first.
            </div>
          )}
        </SelectContent>
      </Select>
      {param.helperText && (
        <p className="text-muted-foreground text-xs px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default CredentialParam;
