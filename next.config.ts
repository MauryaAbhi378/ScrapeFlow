import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  
  experimental: {
    // Include @sparticuz/chromium binaries in the serverless function output
    outputFileTracingIncludes: {
      '/api/**/*': [
        './node_modules/@sparticuz/chromium/bin/*',
      ],
    },
    // Ensure we can use external packages
    serverComponentsExternalPackages: ['@sparticuz/chromium'],
  },
};

export default nextConfig;
