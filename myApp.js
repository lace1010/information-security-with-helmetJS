const express = require("express");
const { xssFilter, noSniff, contentSecurityPolicy } = require("helmet");
const helmet = require("helmet");
const app = express();

let ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(xssFilter());
app.use(noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl()); // Don't want this on mine as it stops fetching links for security reasons at the sake of performance (mainly needed for big websites with millions of viewers)
app.use(helmet.noCache()); // Makes users download newest version. Caching has performance benefits, which you will lose, so only use this option when there is a real need.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);

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
