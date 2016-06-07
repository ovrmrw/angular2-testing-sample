

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');

    var title = element(by.binding('title'));
    expect(title.getText()).toEqual('My First Angular 2 App');
    
  });
});