import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { Link2Icon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const NavigateUrlTask: WorkflowTask = {
  type: TaskType.NAVIGATE_URL,
  label: "Navigate Url",
  icon: createTaskIcon(Link2Icon, "stroke-amber-500"),
  credits: 2,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Url",
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
