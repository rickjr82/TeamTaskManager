// Karma configuration
// Generated on Wed Oct 23 2013 10:32:32 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        '../../Scripts/jquery-1.9.1.js',
     '../../Scripts/angular.js',
        '../../Scripts/angular-mocks.js',
        '../../Scripts/q.min.js',
        '../../Scripts/modernizr-2.6.2.js',
     '../../Scripts/underscore.min.js',
        '../../Scripts/breeze.min.js',
        '../../Scripts/breeze.savequeuing.js',
        '../../Scripts/toastr.min.js',
        '../../Scripts/ui-bootstrap-0.6.0.min.js',
        '../teamTaskManager.main.js',
        '../js/**/*.js',
     '*.tests.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
