"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateCredential } from "@/actions/credentials/createCredential";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

function CreateCredentialDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await CreateCredential(name, value);
    },
    onSuccess: () => {
      toast.success("Credential created successfully", { id: "create-credential" });
      setOpen(false);
      setName("");
      setValue("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create credential", {
        id: "create-credential",
      });
    },
  });

  const handleSubmit = useCallback(() => {
    if (!name || !value) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.loading("Creating credential...", { id: "create-credential" });
    mutate();
  }, [name, value, mutate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="emerald">
          {triggerText ?? "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full">
              <ShieldIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-emerald-600 dark:text-emerald-400">
            Create credential
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                (required)
              </span>
            </Label>
            <Input
              id="name"
              placeholder="Enter credential name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-emerald-200 focus:border-emerald-500 dark:border-emerald-800"
            />
            <p className="text-xs text-muted-foreground break-words">
              Enter a unique and descriptive name for the credential / This
              name will be used to identify the credential
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">
              Value{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                (required)
              </span>
            </Label>
            <Textarea
              id="value"
              placeholder="Enter credential value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border-emerald-200 focus:border-emerald-500 dark:border-emerald-800 min-h-[100px] max-h-[150px] resize-none overflow-y-auto break-all"
            />
            <p className="text-xs text-muted-foreground break-words">
              Enter the value associated with this credential / This value will
              be securely encrypted and stored
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !name || !value}
            className="w-full"
            variant="emerald"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCredentialDialog;
