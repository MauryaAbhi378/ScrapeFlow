import { ExecutionEnvironment } from "@/types/executor";
import { ScrollToElementTask } from "../task/ScrollToElement";

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    await environment.getPage()!.evaluate((sel: string) => {
      const element = document.querySelector(sel);
      if (!element) throw new Error(`Element not found: ${sel}`);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, selector);

    environment.log.info(`Scrolled to element: ${selector}`);
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
