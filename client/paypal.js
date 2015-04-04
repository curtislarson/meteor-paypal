PayPal = {};

// Request PayPal credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
PayPal.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'paypal'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var scope = ['client_credentials'];
  if (options.requestPermissions)
    scope = options.requestPermissions;
  var flatScope = _.map(scope, encodeURIComponent).join('+');
  var loginStyle = OAuth._loginStyle('paypal', config, options);

  console.log("loginStyle=", loginStyle);

  var loginUrl =
    config.url + '/v1/oauth2/token' +
    '?response_type=token' +
    '&client_id=' + config.clientId +
    '&grant_type=' + flatScope +
    '&redirect_uri=' + OAuth._redirectUri('paypal', config) +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    console.log("loginUrl=", loginUrl);

  OAuth.launchLogin({
    loginService: "paypal",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: { height: 600 }
  });
};