import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>,
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

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Value not defined");
      return false;
    }

    const parsedJson = JSON.parse(json) as Record<string, unknown>;
    parsedJson[propertyName] = value;

    environment.setOutput("Json", JSON.stringify(parsedJson));
    environment.log.info(`Added/updated property "${propertyName}" in JSON`);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
