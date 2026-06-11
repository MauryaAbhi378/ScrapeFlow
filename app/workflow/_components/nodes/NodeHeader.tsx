"use client";

import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TaskCreditsBadge from "../TaskCreditsBadge";

function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { deleteElements } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground ">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && (
            <Badge className="bg-emerald-500">Entry point</Badge>
          )}
          <TaskCreditsBadge credits={task.credits} />
          {!task.isEntryPoint && (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer text-muted-foreground hover:text-destructive"
              onClick={() => {
                void deleteElements({ nodes: [{ id: nodeId }] });
              }}
            >
              <Trash2Icon size={16} />
            </Button>
          )}
          <Button
            variant={"ghost"}
            size="icon"
            className="drag-handle cursor-grab "
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
