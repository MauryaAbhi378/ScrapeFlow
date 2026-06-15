import { RunWorkflow } from "@/actions/WorkFlows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Execution created", { id: "flow-execution" });
      router.push(`/workflow/runs/${data.workflowId}/${data.executionId}`);
    },
    onError: () => {
      toast.error("Execution Failed", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
