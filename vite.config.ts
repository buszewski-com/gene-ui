import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import type { UserConfigExport } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./config/test.setup.ts"],
  },
}) satisfies UserConfigExport;
