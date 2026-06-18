import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Value not defined");
      return false;
    }

    await environment.getPage()!.type(selector, value);
    environment.log.info(`Filled input "${selector}" with value`);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
