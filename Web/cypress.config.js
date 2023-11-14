const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // there is a line also need in support/e2e.js
  //reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      //for generating html reports
      //require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "http://localhost:5173/",
    video: true
  },
});
