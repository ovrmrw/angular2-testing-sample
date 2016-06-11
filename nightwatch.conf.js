'use strict';

const jar = require('selenium-server-standalone-jar');
const phantomjs = require('phantomjs-prebuilt');

// phantomjsだとsetInterval等でDOMが更新されているとエラーになるので仕方なくfirefoxを使う。
const browserName = 'firefox';


module.exports = (function (settings) {
  settings.selenium.server_path = jar.path;
  settings.test_settings.default.desiredCapabilities['phantomjs.binary.path'] = phantomjs.path;
  if (browserName) {
    settings.test_settings.default.desiredCapabilities['browserName'] = browserName;
  }
  return settings;
})(require('./config/nightwatch.json'));