// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const protractor = require('protractor');
const HtmlReporter = require('protractor-beautiful-reporter');



/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  SELENIUM_PROMISE_MANAGER: false,
  getPageTimeout: 6000,
  specs: [
    './src/**/*.spec.ts',
    './src/test/authentication.spec.ts',
    './src/tests/profile.spec.ts',
    './src/tests/observation.spec.ts',
    './src/tests/activity.spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  //seleniumAddress: 'http://seleniumhub:4444/wd/hub',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'target/screenshots',
      takeScreenShotsOnlyForFailedSpecs: true
   }).getJasmine2Reporter());
  }
};