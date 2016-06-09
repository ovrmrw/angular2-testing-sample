var maxWait = 5000;

module.exports = {
  'Nightwatch test 1': function (browser) {
    browser
      .url('http://localhost:3000')

      .waitForElementVisible('body', maxWait)
      .assert.title('Angular 2 QuickStart')

      .waitForElementVisible('my-app h3', maxWait)
      .assert.containsText('my-app h3', 'top component')
      .waitForElementVisible('sg-page1 h4', maxWait)
      .assert.containsText('sg-page1 h4', 'page1 content.')

      // ボタンクリックでテキストが変わる。
      .click('button[name="change"]', function () {
        this.assert.containsText('sg-page1 h4', 'page1 content changed.')
      })

      .end();
  },

  'Nightwatch test 2': function (browser) {
    browser
      .url('http://localhost:3000')

      .waitForElementVisible('sg-page1 ul #text0', maxWait)
      .assert.containsText('sg-page1 ul #text0', 'start async')
      .waitForElementVisible('sg-page1 ul #text2', maxWait) // 少し遅れて表示される。
      .assert.containsText('sg-page1 ul #text2', 'end async')

      .end();      
  }
};
