import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { GlobeIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const LaunchBrowserTask: WorkflowTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch browser",
  icon: createTaskIcon(GlobeIcon, "stroke-sky-500"),
  credits: 5,
  isEntryPoint: true,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "For example: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: "Web page", type: TaskParamType.BROWSER_INSTANCE }],
};
