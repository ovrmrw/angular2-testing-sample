const maxWait = 5000;

module.exports = {
  'Nightwatch test 2': function (client) {
    client
      .url('http://localhost:3000')

      .waitForElementVisible('sg-page1 ul #text0', maxWait)
      .assert.containsText('sg-page1 ul #text0', 'start async')
      .waitForElementVisible('sg-page1 ul #text2', maxWait) // 少し遅れて表示される。
      .assert.containsText('sg-page1 ul #text2', 'end async')
      
      .end();
  }
};