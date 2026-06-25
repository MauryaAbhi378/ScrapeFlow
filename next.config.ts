import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Include @sparticuz/chromium binaries in the serverless function output
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/@sparticuz/chromium/bin/*',
    ],
  },
  
  // Ensure we can use external packages
  serverExternalPackages: ['@sparticuz/chromium'],
};

export default nextConfig;
