import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { MousePointerClickIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const ClickElementTask: WorkflowTask = {
  type: TaskType.CLICK_ELEMENT,
  label: "Click Element",
  icon: createTaskIcon(MousePointerClickIcon, "stroke-amber-400"),
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
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
