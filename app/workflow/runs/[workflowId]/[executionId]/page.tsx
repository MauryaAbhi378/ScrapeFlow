import {  GetWorkflowExecutionWithPhases } from "@/actions/WorkFlows/getWorkflowExecutionWithPhases";
import TopBar from "@/app/workflow/_components/topbar/TopBar";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

export default async function ExecutionViewerPage({
  params,
}: {
  params: Promise<{
    executionId: string;
    workflowId: string;
  }>;
}) {
  const { workflowId, executionId } = await params;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopBar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center ">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-emerald-400" />
            </div>
          }
        >
          <ExecutionViewWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewWrapper({ executionId }: { executionId: string }) {

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)

  if(!workflowExecution){
    return <div>Workflow execution not found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution} />
}
