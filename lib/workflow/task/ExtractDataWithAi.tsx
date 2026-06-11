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
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Instructions",
      type: TaskParamType.STRING,
      helperText: "Describe the fields and output shape the AI should extract.",
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
