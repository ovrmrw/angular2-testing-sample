// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  // .withCapabilities(sw.Capabilities.firefox())
  .forBrowser('firefox')
  .build()

// And then...
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

// And you're good to go!
driver.get('http://localhost:3000');
chai.expect('my-app h1').dom.to.not.contain.text("My First Angular 2 App");
