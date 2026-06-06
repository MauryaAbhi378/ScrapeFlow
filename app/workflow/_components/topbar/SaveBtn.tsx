"use client";

import { UpdateWorkflow } from "@/actions/WorkFlows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong", { id: "save-workflow" });
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowData = JSON.stringify(toObject());
        toast.loading("Saving Workflow...", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowData,
        });
      }}
    >
      <CheckIcon size={16} className="stroke-emerald-400" />
      Save
    </Button>
  );
}

export default SaveBtn;
