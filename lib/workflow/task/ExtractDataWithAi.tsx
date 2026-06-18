import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { BrainIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const ExtractDataWithAiTask: WorkflowTask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: createTaskIcon(BrainIcon, "stroke-pink-400"),
  credits: 4,
  isEntryPoint: false,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.JSON,
    },
  ],
};
