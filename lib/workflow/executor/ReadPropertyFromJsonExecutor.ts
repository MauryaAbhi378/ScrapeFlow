import { ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>,
): Promise<boolean> {
  try {
    const json = environment.getInput("Json");
    if (!json) {
      environment.log.error("Json input not defined");
      return false;
    }

    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("Property name not defined");
      return false;
    }

    const parsedJson = JSON.parse(json) as Record<string, unknown>;
    const value = parsedJson[propertyName];

    if (value === undefined) {
      environment.log.error(`Property "${propertyName}" not found in JSON`);
      return false;
    }

    environment.setOutput("Value", typeof value === "string" ? value : JSON.stringify(value));
    environment.log.info(`Read property "${propertyName}" from JSON`);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
