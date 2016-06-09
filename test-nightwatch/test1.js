const waitMax = 5000;

module.exports = {
  'Nightwatch test 1': function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', waitMax)
      .assert.title('Angular 2 QuickStart')
      // .pause(1000)
      // .assert.visible()
      // .assert.visible('input[type=text]')
      // .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible('my-app h3', waitMax)
      .assert.containsText('my-app h3', 'top component')
      // .click('input[name=btnK]')
      // .pause(1000)
      // .assert.containsText('ol#rso li:first-child',
      //   'Rembrandt van Rijn - Wikipedia')      
      .waitForElementVisible('sg-page1 h4', waitMax)
      .assert.containsText('sg-page1 h4', 'page1 content')
      .end();
  }
};