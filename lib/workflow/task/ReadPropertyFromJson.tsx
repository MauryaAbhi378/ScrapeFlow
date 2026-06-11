import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { BracesIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const ReadPropertyFromJsonTask: WorkflowTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from JSON",
  icon: createTaskIcon(BracesIcon, "stroke-orange-300"),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "Json",
      type: TaskParamType.JSON,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      helperText: "Property key to read from the JSON payload.",
      required: true,
    },
  ],
  outputs: [
    {
      name: "Value",
      type: TaskParamType.STRING,
    },
  ],
};
