/* eslint-disable */
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      require("@cypress/code-coverage/task")(on, config);

      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/integration/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/**/*.feature",
    ],
  },

  coverage: {
    includeAllSources: false,
    reporters: ["lcov", "text-summary"],
    exclude: ["/node_modules/"],
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  plugins: {
    codeCoverage: {
      reporters: ["lcov", "text-summary"],
      exclude: ["/node_modules/"],
    },
  },
});
