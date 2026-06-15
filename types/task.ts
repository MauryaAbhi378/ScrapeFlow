import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  NAVIGATE_URL = "NAVIGATE_URL",
  FILL_INPUT = "FILL_INPUT",
  CLICK_ELEMENT = "CLICK_ELEMENT",
  SCROLL_TO_ELEMENT = "SCROLL_TO_ELEMENT",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  EXTRACT_DATA_WITH_AI = "EXTRACT_DATA_WITH_AI",
  READ_PROPERTY_FROM_JSON = "READ_PROPERTY_FROM_JSON",
  ADD_PROPERTY_TO_JSON = "ADD_PROPERTY_TO_JSON",
  WAIT_FOR_ELEMENT = "WAIT_FOR_ELEMENT",
  DELIVER_VIA_WEBHOOK = "DELIVER_VIA_WEBHOOK",
}

export enum TaskParamType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
  JSON = "JSON",
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: unknown;
}

export interface WorkflowTask {
  type: TaskType;
  label: string;
  icon: ComponentType<LucideProps>;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
}
