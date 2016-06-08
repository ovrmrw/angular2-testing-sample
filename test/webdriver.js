var webdriver = require('selenium-webdriver');
var By = webdriver.By;


//WebブラウザーはChrome
var driver = new webdriver.Builder().
  //  withCapabilities(webdriver.Capabilities.chrome()).
  forBrowser('firefox').
  build();
var $ = driver.findElement.bind(driver);

//Googleを開く。
driver.get('http://www.google.com');

//検索ボックスにwebdriverと入力する。
$(By.name('q')).sendKeys('webdriver');

//検索ボタンを押す。
$(By.name('btnG')).click();

//ヒット数が表示されるまで待つ。
var timeoutMSec = 2000;
driver.wait(webdriver.until.elementLocated(By.id('resultStats')), timeoutMSec)
  .then(function () { //waitした後はthenでつなぐ
    $(By.id('resultStats')).getText().then(function (text) {
      console.log(text);
    });
  })
  .then(function () {
    driver.quit();
  });