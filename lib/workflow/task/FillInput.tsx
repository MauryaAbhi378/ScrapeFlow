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
      helperText: "CSS selector for the input or textarea element.",
      required: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      helperText: "Text that should be typed into the selected field.",
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
