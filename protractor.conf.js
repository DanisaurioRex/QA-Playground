require('ts-node/register');
require('tsconfig-paths/register');
const path = require('path');

const consumerRequireList = [
  'dist/src/step_definitions/**/*.steps.js',
  'dist/src/hooks/*.js',
  'dist/src/env.js'
];

const defaultPath = __dirname

exports.config = {
  seleniumServerJar: require('selenium-standalone-jar').path,
  seleniumAddress: process.env.seleniumAddress || 'http://localhost:4444/wd/hub',
  chromeDriver: require('chromedriver').path,

  directConnect: true,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  getPageTimeout: 60000,
  // allScriptsTimeout: 60000,
  ignoreUncaughtExceptions: true,

  // java.io.IOException: Error writing to server
  seleniumInstallArgs: { version: '3.4.0' },
  seleniumArgs: { version: '3.4.0' },

  setDefaultTimeout: 60000,

  SELENIUM_PROMISE_MANAGER: false,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'maxInstances': 1,
    'shardTestFiles': true,
    'goog:chromeOptions': {
      'args': ['--verbose', '--no-sandbox', '--test-type=browser'],
      'prefs': {
        'download.prompt_for_download': false,
        'download.default_directory': path.resolve(defaultPath, './downloads')
      }
    },
    'loggingPrefs': {
      'browser': 'ALL'
    }
  },

  /**
   * In order to set a static path where the files will be downloaded,
   * And start a download immediately without prompting saveToDisk.
   * This will overwrite the default capabilities and set a path for xls and xlsx downloads.
   */
  getMultiCapabilities: function () {
    'use strict';
    // reset maxInstances, shardTestFiles by passing a param
    this.capabilities.maxInstances = this.params.maxInstances || this.capabilities.maxInstances;
    this.capabilities.shardTestFiles = this.params.shardTestFiles || this.capabilities.shardTestFiles;

    // set browser downloads dir to '/tmp' by default (if not overridden by param) and keep it in env variable
    if (this.params.downloadFolder === undefined || this.params.downloadFolder === '') {
      process.env.downloadFolder = path.resolve(defaultPath, './downloads');
    } else {
      process.env.downloadFolder = this.params.downloadFolder;
    }
    return [this.capabilities];
  },

  onPrepare: function () {
    browser.waitForAngularEnabled(false);
    
    // set browser.params.downloadFolder to reuse it when accessing downloaded files
    if (browser.params.downloadFolder === undefined) {
      browser.params.downloadFolder = process.env.downloadFolder;
    }

    // fullHD dimensions.
    browser.params.fullhd_window_width = 1920;
    browser.params.fullhd_window_height = 1080;

    browser.driver.manage().window().setSize(
      browser.params.window_width || browser.params.fullhd_window_width,
      browser.params.window_height || browser.params.fullhd_window_height);
  },

  specs: [
    'dist/features/**/*.feature'
  ],

  cucumberOpts: {
    require: consumerRequireList,
    strict: true,
    tags: [
      '~@wip'
    ]
  }
};
