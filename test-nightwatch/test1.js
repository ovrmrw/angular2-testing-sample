const maxWait = 5000;

module.exports = {
  'Nightwatch test 1': function (client) {
    client
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
  }
};