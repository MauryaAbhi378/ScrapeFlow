import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { TextIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const ExtractTextFromElementTask: WorkflowTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: createTaskIcon(TextIcon, "stroke-pink-300"),
  credits: 2,
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      rows: 4,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ],
};
