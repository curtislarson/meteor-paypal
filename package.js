Package.describe({
  name: "quackware:paypal2",
  version: "0.0.2",
  // Brief, one-line summary of the package.
  summary: "PayPal oauth and api for Meteor",
  // URL to the Git repository containing the source code for this package.
  git: "https://github.com/quackware/meteor-paypal",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md"
});

Npm.depends({
  "paypal-rest-sdk": "1.5.2"
});

Package.onUse(function(api) {
  api.versionsFrom("WINDOWS-PREVIEW@0.3.0");

  api.addFiles("server/paypal.js", "server");

  api.export("PayPal");
});

Package.onTest(function(api) {
  api.use("quackware:paypal2");
  api.use([
    "tinytest"
  ], ["server"]);

  // Files to test
  api.addFiles("server/paypal.js", "server");

  // Test drivers
  api.addFiles("server/tests/paypal.t.js", "server");
});
