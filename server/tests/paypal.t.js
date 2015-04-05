Tinytest.add("PayPal.requestCredential()", function(test) {
  console.log("About to requestCredential");
  var options = {};
  PayPal.configure({
    client_id: "",
    client_secret: "",
    mode: "sandbox"
  });
  PayPal.requestCredential(options, function(token, secret) {
    console.log("token=", token);
    console.log("secret=", secret);
  });
});