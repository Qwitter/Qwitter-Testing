const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // there is a line also needed in support/e2e.js
  reporter: 'cypress-mochawesome-reporter',
  env: {
    MAILISK_API_KEY: "TIX9v5Xw5cqu6uzXxnjX46WRFZAI2ViIM5-J9bq4pW8",
    MAILISK_NAMESPACE: "v3rzvekshyl8"
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //for generating html reports
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    video: true
  },
});
