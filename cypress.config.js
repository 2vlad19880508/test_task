const { defineConfig } = require("cypress")

module.exports = {
  modifyObstructiveCode: false,
  chromeWebSecurity: false,
  viewportHeight: 900,
  viewportWidth: 1920,
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: 'http://quotes.toscrape.com/'
  }
}
