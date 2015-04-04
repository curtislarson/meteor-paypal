PayPal = {};

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

  var config = ServiceConfiguration.configurations.findOne({service: "paypal"});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var scope = ["client_credentials"];
  if (options.requestPermissions)
    scope = options.requestPermissions;
  var flatScope = _.map(scope, encodeURIComponent).join("+");
  var loginStyle = OAuth._loginStyle("paypal", config, options);

  console.log("loginStyle=", loginStyle);

  var tokenUrl = config.url + "/v1/oauth2/token";

  var res = HTTP.post(tokenUrl, {
    data: {
      grant_type: flatScope
    },
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "en_US",
      "Authorization": "Basic " + Base64.encode(config.clientId + ":" + config.secret)
    }
  }, function(result, error) {
    console.log("callback", result, error);
  });

  console.log("res=", res);
};