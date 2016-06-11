'use strict';

var maxWait = 5000;

module.exports = {
  'Nightwatch test 2': function (browser) {
    browser
      .url('http://localhost:3000')

      .waitForElementVisible('sg-page1 ul li#text0', maxWait)
      .assert.containsText('sg-page1 ul li#text0', 'start async')
      .waitForElementPresent('sg-page1 ul li#text2', maxWait) // 少し遅れて表示される。
      .assert.containsText('sg-page1 ul li#text2', 'end async')

      .end();      
  }
};
