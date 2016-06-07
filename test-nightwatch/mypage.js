module.exports = {
  'Test my page' : function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('Angular 2 QuickStart')
      // .assert.visible('input[type=text]')
      // .setValue('input[type=text]', 'rembrandt van rijn')
      // .waitForElementVisible('input[name=btnK]', 1000)
      // .click('input[name=btnK]')
      // .pause(1000)
      // .assert.containsText('ol#rso li:first-child',
      //   'Rembrandt van Rijn - Wikipedia')
      .end();
  }
};