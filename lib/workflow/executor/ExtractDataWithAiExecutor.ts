import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import { GetCredentialValue } from "@/actions/credentials/getCredentialValue";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>,
): Promise<boolean> {
  try {
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("Content input not defined");
      return false;
    }

    const credentialId = environment.getInput("Credentials");
    if (!credentialId) {
      environment.log.error("Credentials not defined");
      return false;
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("Prompt not defined");
      return false;
    }

    // Get the API key from the credential
    let apiKey: string;
    try {
      apiKey = await GetCredentialValue(credentialId);
    } catch (error) {
      environment.log.error(`Failed to retrieve credential: ${(error as Error).message}`);
      return false;
    }

    if (!apiKey) {
      environment.log.error("API key not found in credential");
      return false;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a data extraction assistant. Extract structured data from HTML based on the provided instructions. Respond with valid JSON only — no markdown, no explanation.",
          },
          {
            role: "user",
            content: `Instructions:\n${prompt}\n\nHTML:\n${content}`,
          },
        ],
        temperature: 0,
      }),
    });

    if (!response.ok) {
      environment.log.error(`OpenAI API error: ${response.status} ${response.statusText}`);
      return false;
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };

    const extractedData = data.choices[0]?.message?.content;
    if (!extractedData) {
      environment.log.error("No data returned from AI");
      return false;
    }

    // Validate that the response is valid JSON
    JSON.parse(extractedData);

    environment.setOutput("Extracted data", extractedData);
    environment.log.info("Data extracted successfully with AI");
    return true;
  } catch (err: unknown) {
    environment.log.error((err as Error).message);
    return false;
  }
}
