import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { PencilIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const FillInputTask: WorkflowTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: createTaskIcon(PencilIcon, "stroke-orange-400"),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
