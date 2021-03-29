const express = require("express");
const { xssFilter, noSniff, contentSecurityPolicy } = require("helmet");
const helmet = require("helmet");
const app = express();

/* app.use(helmet()) will automatically include all the middleware introduced above, except noCache(), and contentSecurityPolicy(), 
but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.

Example:

app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["self"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
We introduced each middleware separately for teaching purposes and for ease of testing. Using the ‘parent’ helmet() middleware is easy to 
implement in a real project. */

app.use(helmet());
// don't edit below this note
module.exports = app;
var api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
