import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // /services/preventive-care/ → out/services/preventive-care/index.html (works on any static host).
  trailingSlash: true,
  images: { unoptimized: true },
  // Pin the workspace root so a stray lockfile higher up the tree isn't picked up.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
