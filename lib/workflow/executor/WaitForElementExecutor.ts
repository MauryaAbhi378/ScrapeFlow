import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/WaitForElement";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const timeoutInput = environment.getInput("Timeout (ms)");
    const timeout = timeoutInput ? parseInt(timeoutInput, 10) : 30000;

    await environment.getPage()!.waitForSelector(selector, { timeout });
    environment.log.info(`Element found: ${selector}`);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
