var util = require('util')
  , expect = require('chai').expect
  , webdriver = require('selenium-webdriver')
  , protractor = require('../../node_modules/protractor/lib/protractor.js');

describe('angularjs.org homepage', function() {
  this.timeout(80000);

  var driver, ptor;

  beforeEach(function() {
    driver = new webdriver.Builder().
        usingServer('http://localhost:4444/wd/hub').
        withCapabilities({
          'browserName': 'chrome',
          'version': '',
          'platform': 'ANY',
          'javascriptEnabled': true
        }).build();

    driver.manage().timeouts().setScriptTimeout(10000);
    ptor = protractor.wrapDriver(driver);
  });

  afterEach(function(done) {
    driver.quit().then(function() {done()});
  });

  it('should greet using binding', function(done) {
     ptor.get('http://www.angularjs.org');

     ptor.findElement(protractor.By.input('yourName')).sendKeys('Julie');

     ptor.findElement(protractor.By.binding('{{yourName}}')).
         getText().then(function(text) {
           expect(text).to.eql('Hello Julie!');
           done();
         });
   });
});