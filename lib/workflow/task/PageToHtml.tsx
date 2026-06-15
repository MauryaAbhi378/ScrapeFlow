import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { CodeIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const PageToHtmlTask: WorkflowTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: createTaskIcon(CodeIcon, "stroke-rose-400"),
  credits: 2,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask
