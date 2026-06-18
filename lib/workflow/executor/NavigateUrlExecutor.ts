import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>,
): Promise<boolean> {
  try {
    const url = environment.getInput("Url");
    if (!url) {
      environment.log.error("URL not defined");
      return false;
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`Navigated to: ${url}`);
    environment.setOutput("Web page", url);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
