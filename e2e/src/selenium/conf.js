exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/*.js'],
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: () => {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true,
        displayErrorMessages: true,
        displayFailed: true,
        displayDuration: true
      },
      summary: {
        displayErrorMessages: true,
        displayStacktrace: false,
        displaySuccessful: true,
        displayFailed: true,
        displayDuration: true
      },
      colors: {
        enabled: true
      }
    }));
  }
}
