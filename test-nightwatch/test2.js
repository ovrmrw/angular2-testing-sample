const waitMax = 5000;

module.exports = {
  'Nightwatch test 2': function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('sg-page1 ul #text0', waitMax)
      .assert.containsText('sg-page1 ul #text0', 'start async')
      .waitForElementVisible('sg-page1 ul #text2', waitMax) // 少し遅れて表示される。
      .assert.containsText('sg-page1 ul #text2', 'end async')
      .end();
  }
};