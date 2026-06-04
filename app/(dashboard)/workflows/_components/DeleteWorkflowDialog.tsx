"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteWorkflow } from "@/actions/WorkFlows/deleteWorkflow";
import { useRouter } from "next/navigation";

interface DeleteWorkflowDialogProps {
  workflowId: string;
  workflowName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteWorkflowDialog({
  workflowId,
  workflowName,
  isOpen,
  onOpenChange,
}: DeleteWorkflowDialogProps) {
  const [confirmInput, setConfirmInput] = useState("");
  const router = useRouter();

  const isConfirmed = confirmInput === workflowName;

  const deleteMutation = useMutation({
    mutationFn: () => DeleteWorkflow(workflowId),
    onSuccess: () => {
      toast.success("Workflow deleted successfully");
      onOpenChange(false);
      setConfirmInput("");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete workflow";
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    if (!isConfirmed) return;
    deleteMutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            If you delete this workflow, you will not be able to recover it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 py-4">
          <Label htmlFor="confirm-input" className="text-sm text-foreground">
            If you are sure, enter{" "}
            <span className="font-bold">{workflowName}</span> to confirm:
          </Label>
          <Input
            id="confirm-input"
            placeholder={workflowName}
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            className="border-input"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
