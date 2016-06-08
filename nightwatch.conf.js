const jar = require('selenium-server-standalone-jar');
const phantomjs = require('phantomjs-prebuilt');

module.exports = (function (settings) {
  settings.selenium.server_path = jar.path;
  settings.test_settings.default.desiredCapabilities['phantomjs.binary.path'] = phantomjs.path;
  return settings;
})(require('./config/nightwatch.json'));