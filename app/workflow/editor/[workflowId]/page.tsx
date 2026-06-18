import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_components/Editor";

async function Page({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  console.log("[DEBUG] Workflow editor page accessed");
  const { workflowId } = await params;
  console.log("[DEBUG] Workflow ID:", workflowId);
  
  const { userId } = await auth();
  console.log("[DEBUG] User ID:", userId);

  if (!userId) {
    console.log("[DEBUG] User not authenticated");
    return <div>Unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findFirst({
    where: {
      id: workflowId,
      userId,
    },
  });

  console.log("[DEBUG] Workflow found:", !!workflow);

  if (!workflow) {
    console.log("[DEBUG] Workflow not found for ID:", workflowId);
    return <div>Workflow not found</div>;
  }
  return <Editor workflow={workflow} />;
}

export default Page;
