import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    
    // Use different configuration for production vs development
    const isProduction = process.env.NODE_ENV === "production";
    
    let browser;
    if (isProduction) {
      environment.log.info("Launching browser in production mode");
      
      try {
        // For production (serverless environments)
        // Using chromium-min which loads binaries from remote URL
        const chromium = await import("@sparticuz/chromium-min");
        const puppeteerCore = await import("puppeteer-core");
        
        // Use Chromium binaries from GitHub releases (no local files needed)
        // This avoids file size limits and deployment bundle issues
        const executablePath = await chromium.default.executablePath(
          process.env.CHROMIUM_PACK_URL || 
          'https://github.com/Sparticuz/chromium/releases/download/v140.0.0/chromium-v140.0.0-pack.tar'
        );
        
        environment.log.info(`Using Chrome executable: ${executablePath}`);
        
        browser = await puppeteerCore.default.launch({
          args: [
            ...chromium.default.args,
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
          ],
          executablePath,
          headless: true,
        });
      } catch (prodError: any) {
        environment.log.error(`Production browser launch failed: ${prodError.message}`);
        throw new Error(`Failed to launch browser in production: ${prodError.message}`);
      }
    } else {
      // For local development
      environment.log.info("Launching browser in development mode");
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
    
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    
    const page = await browser.newPage();
    
    // Set a reasonable timeout
    page.setDefaultTimeout(30000);
    
    environment.log.info(`Navigating to: ${websiteUrl}`);
    await page.goto(websiteUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    environment.setPage(page);
    environment.log.info(`Successfully opened page at: ${websiteUrl}`);
    
    return true;
  } catch (err: any) {
    environment.log.error(`Browser execution failed: ${err.message}`);
    if (err.stack) {
      environment.log.error(`Stack trace: ${err.stack}`);
    }
    return false;
  }
}
