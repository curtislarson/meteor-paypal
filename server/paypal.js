PayPal = {};

var PayPalSDK = Npm.require("paypal-rest-sdk");

PayPal.configure = function(config) {
  PayPalSDK.configure(config);
}

// Request PayPal credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
PayPal.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var res = PayPalSDK.generateToken(function() {
    console.log("In generateToken", arguments);
  });
  console.log("res=", res);
};