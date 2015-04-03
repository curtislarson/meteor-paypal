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

Package.onUse(function(api) {
  api.versionsFrom("WINDOWS-PREVIEW@0.3.0");
  api.use("http", "server");
  api.use([
    "oauth2",
    "oauth",
    "underscore",
    "service-configuration"
  ], ["client", "server"]);
  api.addFiles("client/paypal.js", "client");
  api.addFiles("server/paypal.js", "server");
});