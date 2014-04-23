module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'bower_components/jasmine-fixture/dist/jasmine-fixture.min.js',
      'src/**/*.js',
      'spec/**/*spec.js'
    ],
    exclude: [
      
    ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};