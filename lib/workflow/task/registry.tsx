import { TaskType, WorkflowTask } from "@/types/task";
import { AddPropertyToJsonTask } from "./AddPropertyToJson";
import { ClickElementTask } from "./ClickElement";
import { DeliverViaWebhookTask } from "./DeliverViaWebhook";
import { ExtractDataWithAiTask } from "./ExtractDataWithAi";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { FillInputTask } from "./FillInput";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { NavigateUrlTask } from "./NavigateUrl";
import { PageToHtmlTask } from "./PageToHtml";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJson";
import { ScrollToElementTask } from "./ScrollToElement";
import { WaitForElementTask } from "./WaitForElement";

export const TaskRegistry: Record<TaskType, WorkflowTask> = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
  [TaskType.NAVIGATE_URL]: NavigateUrlTask,
  [TaskType.FILL_INPUT]: FillInputTask,
  [TaskType.CLICK_ELEMENT]: ClickElementTask,
  [TaskType.SCROLL_TO_ELEMENT]: ScrollToElementTask,
  [TaskType.PAGE_TO_HTML]: PageToHtmlTask,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementTask,
  [TaskType.EXTRACT_DATA_WITH_AI]: ExtractDataWithAiTask,
  [TaskType.READ_PROPERTY_FROM_JSON]: ReadPropertyFromJsonTask,
  [TaskType.ADD_PROPERTY_TO_JSON]: AddPropertyToJsonTask,
  [TaskType.WAIT_FOR_ELEMENT]: WaitForElementTask,
  [TaskType.DELIVER_VIA_WEBHOOK]: DeliverViaWebhookTask,
};
