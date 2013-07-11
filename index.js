var express = require('express'),
    testable = require('express-testable'),
    attach = require('./lib/attach');

module.exports = function(data, done) {
  var port = data.port || 8000,
      host = data.host || 'localhost',
      testConf = data.testable || false,
      staticFiles = data.staticFiles || false,
      routes = data.routes || false,
      proxy = data.proxy || false,
      app = express();

  if (testConf) {
    app.use(express.static(testable.assetsPath()));
    testable.attach(app, testConf);
  }
  if (staticFiles) { attach.staticFiles(app, staticFiles); }
  if (routes) { attach.routes(app, routes); }
  if (proxy) { attach.proxy(app, proxy); }

  app.listen(port, host, done);
};
