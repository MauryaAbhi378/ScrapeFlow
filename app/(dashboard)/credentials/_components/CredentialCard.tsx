"use client";

import { DeleteCredential } from "@/actions/credentials/deleteCredential";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LockIcon, XIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CredentialCardProps {
  credential: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

function CredentialCard({ credential }: CredentialCardProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await DeleteCredential(credential.id);
    },
    onSuccess: () => {
      toast.success("Credential deleted successfully", {
        id: "delete-credential",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete credential", {
        id: "delete-credential",
      });
    },
  });

  const handleDelete = () => {
    toast.loading("Deleting credential...", { id: "delete-credential" });
    mutate();
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 rounded-lg bg-background border hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <LockIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-bold">{credential.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(credential.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
          disabled={isPending}
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <Separator />
    </>
  );
}

export default CredentialCard;
