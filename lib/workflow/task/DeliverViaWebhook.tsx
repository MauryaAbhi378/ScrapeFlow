import { TaskParamType, TaskType, WorkflowTask } from "@/types/task";
import { WebhookIcon } from "lucide-react";
import { createTaskIcon } from "./icon";

export const DeliverViaWebhookTask: WorkflowTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via Webhook",
  icon: createTaskIcon(WebhookIcon, "stroke-sky-400"),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "Payload",
      type: TaskParamType.JSON,
      required: true,
    },
    {
      name: "Webhook URL",
      type: TaskParamType.STRING,
      helperText: "Destination endpoint that should receive the payload.",
      required: true,
    },
  ],
  outputs: [
    {
      name: "Response",
      type: TaskParamType.STRING,
    },
  ],
};
