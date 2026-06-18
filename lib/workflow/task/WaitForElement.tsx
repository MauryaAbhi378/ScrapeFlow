import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { EyeIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const WaitForElementTask: WorkflowTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: createTaskIcon(EyeIcon, "stroke-yellow-500"),
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
      name: "Timeout (ms)",
      type: TaskParamType.STRING,
    },
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
