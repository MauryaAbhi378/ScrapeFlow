import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { ArrowDownToLineIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const ScrollToElementTask: WorkflowTask = {
  type: TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to element",
  icon: createTaskIcon(ArrowDownToLineIcon, "stroke-orange-300"),
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
      helperText: "CSS selector for the element to bring into view.",
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
