module.exports = {
  'Test my page': function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('Angular 2 QuickStart')
      .pause(1000)
      // .assert.visible()
      // .assert.visible('input[type=text]')
      // .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible('my-app h1', 1000)
      // .click('input[name=btnK]')
      // .pause(1000)
      // .assert.containsText('ol#rso li:first-child',
      //   'Rembrandt van Rijn - Wikipedia')
      .assert.containsText('my-app h1', 'Angular 2')
      .waitForElementVisible('my-app2 ul #text0', 1000)
      .assert.containsText('my-app2 ul #text0', 'start async')
      .waitForElementVisible('my-app2 ul #text2', 5000)
      .assert.containsText('my-app2 ul #text2', 'end async')
      .end();
  }
};