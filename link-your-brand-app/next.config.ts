import type { NextConfig } from "next";

// Optional bundle analyzer. Install @next/bundle-analyzer to use it.
// Enable by setting ANALYZE=true when running build: ANALYZE=true npm run build
let nextConfig: NextConfig = {
  /* config options here */
};

try {
  // Dynamically require so this file still works if the package isn't installed.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
  nextConfig = withBundleAnalyzer(nextConfig);
} catch (e) {
  // bundle analyzer not installed — that's fine.
}

export default nextConfig;
