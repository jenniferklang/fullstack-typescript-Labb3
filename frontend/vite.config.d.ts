// vite.config.d.ts
import "vite";

declare module "vite" {
  interface UserConfig {
    test?: {
      globals: boolean;
      environment: string;
      setupFiles: string[];
      coverage: {
        provider: string;
        reporter: string[];
        reportsDirectory: string;
      };
    };
  }
}
