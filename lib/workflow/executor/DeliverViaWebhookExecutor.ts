import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>,
): Promise<boolean> {
  try {
    const payload = environment.getInput("Payload");
    if (!payload) {
      environment.log.error("Payload not defined");
      return false;
    }

    const webhookUrl = environment.getInput("Webhook URL");
    if (!webhookUrl) {
      environment.log.error("Webhook URL not defined");
      return false;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    const statusText = `${response.status} ${response.statusText}`;
    environment.log.info(`Webhook delivered — response status: ${statusText}`);

    if (!response.ok) {
      environment.log.error(`Webhook request failed with status: ${statusText}`);
      return false;
    }

    const responseText = await response.text();
    environment.setOutput("Response", responseText);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
