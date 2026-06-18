import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { DatabaseIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const AddPropertyToJsonTask: WorkflowTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: createTaskIcon(DatabaseIcon, "stroke-orange-400"),
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
      name: "Json",
      type: TaskParamType.JSON,
    },
  ],
};
