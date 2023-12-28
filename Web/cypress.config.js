const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // there is a line also needed in support/e2e.js
  reporter: 'cypress-mochawesome-reporter',
  env: {
    MAILISK_API_KEY: "TIX9v5Xw5cqu6uzXxnjX46WRFZAI2ViIM5-J9bq4pW8",
    MAILISK_NAMESPACE: "l34t7g89e5mp"
  },
  e2e: {
    baseUrl: 'http://qwitter.cloudns.org:4173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //for generating html reports
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
  },
});
