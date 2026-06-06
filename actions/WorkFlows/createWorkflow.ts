"use server";

import { prisma } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form); // safeParse returns an object with success and data or error.Use this so no one can bypass the schema validation by calling this function directly from the client.
  if (!success) {
    throw new Error("Invalid data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  // Check if workflow with same name already exists for this user
  const existingWorkflow = await prisma.workflow.findFirst({
    where: {
      userId,
      name: data.name,
    },
  });

  if (existingWorkflow) {
    throw new Error("DUPLICATE_NAME");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  return { id: result.id };
}
