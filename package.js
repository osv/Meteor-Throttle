
Package.describe({
  name: "zeroasterisk:throttle",
  summary: "A secure means of limiting interactions (emails, etc)",
  version: "0.3.1",
  git: "https://github.com/zeroasterisk/Meteor-Throttle.git"
});

Package.onUse(function (api) {
  api.versionsFrom("1.0.4");
  api.use(['meteor', 'underscore'], 'server');
  // Export the object 'Throttle' to packages or apps that use this package.
  api.export('Throttle', 'server');
  api.addFiles('throttle.js', ['server']);
});

Package.onTest(function (api) {
  api.use("zeroasterisk:throttle");
  api.use('tinytest@1.0.0');
  api.use('underscore');
  api.use('meteor');
  api.addFiles('throttle_tests.js', ['client', 'server']);
});
