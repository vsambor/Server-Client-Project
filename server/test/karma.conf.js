// This is a karma config file. For more details see http://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./specs/*.spec.js'],
    preprocessors: {
      // Allows usage of ES6 in all server tests.
      './specs/*.spec.js': 'babel'
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
