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
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
  env: {
    userId: 1,
    shippingFee: 19.9,
  },
});
