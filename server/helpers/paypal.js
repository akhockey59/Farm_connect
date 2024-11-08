const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AZmVjZ8UUY1MJsnjDGbZ0ZUrE5Dlfb75GCcQ4F5TOFFppK8uXtYZmVIiv1fmAFnzySeVzGaNJRwmPBHN",
  client_secret: "EOmIT4bmdPMJzlAn--o1FyL0nE0xS5lf5BULaX4Do0l_m60bPwnjsZxd1BijhNnB8it-zp7SZrMatYTe",
});

module.exports = paypal;
