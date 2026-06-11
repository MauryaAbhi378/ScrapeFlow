"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import React from "react";
import TaskCreditsBadge from "./TaskCreditsBadge";

const taskMenuSections = [
  {
    value: "interactions",
    title: "User interactions",
    tasks: [
      TaskType.NAVIGATE_URL,
      TaskType.FILL_INPUT,
      TaskType.CLICK_ELEMENT,
      TaskType.SCROLL_TO_ELEMENT,
    ],
  },
  {
    value: "extraction",
    title: "Data extraction",
    tasks: [
      TaskType.PAGE_TO_HTML,
      TaskType.EXTRACT_TEXT_FROM_ELEMENT,
      TaskType.EXTRACT_DATA_WITH_AI,
    ],
  },
  {
    value: "storage",
    title: "Data storage",
    tasks: [TaskType.READ_PROPERTY_FROM_JSON, TaskType.ADD_PROPERTY_TO_JSON],
  },
  {
    value: "timing",
    title: "Timing controls",
    tasks: [TaskType.WAIT_FOR_ELEMENT],
  },
  {
    value: "delivery",
    title: "Result delivery",
    tasks: [TaskType.DELIVER_VIA_WEBHOOK],
  },
] as const;

export default function TaskMenu() {
  return (
    <aside className="h-full w-80 min-w-80 max-w-80 overflow-y-auto border-r-2 bg-background">
      <Accordion
        type="multiple"
        className="w-full px-2 py-1.5"
        defaultValue={taskMenuSections.map((section) => section.value)}
      >
        {taskMenuSections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger className="py-1.5 text-left text-sm font-bold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 pt-0">
              {section.tasks.map((taskType) => (
                <TaskMenuBtn key={taskType} taskType={taskType} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex h-auto w-full items-center justify-between gap-2 border px-3 py-2 text-[11px] font-medium"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex items-center gap-1.5">
        <task.icon size={14} />
        {task.label}
      </div>
      <TaskCreditsBadge credits={task.credits} />
    </Button>
  );
}
