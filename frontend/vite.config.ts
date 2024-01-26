import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      nycrcPath: "./frontend/.nycrc",
      forceBuildInstrument: true, //Instrument the source code for cypress runs
    }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:3002",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/components/", "./src/views/"],
    coverage: {
      provider: "istanbul",
      reporter: ["json", "lcov", "json-summary"],
      reportsDirectory: "./frontend/coverage",
    },
  },
});
