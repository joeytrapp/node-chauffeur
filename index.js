var express = require('express'),
    testable = require('testable-middleware'),
    attach = require('./lib/attach');

module.exports = function(data, done) {
  var port = data.port || 8000,
      host = data.host || 'localhost',
      testConf = data.testable || false,
      staticFiles = data.staticFiles || false,
      routes = data.routes || false,
      proxy = data.proxy || false,
      before = data.before || false,
      after = data.after || false,
      app = express();

  if (typeof before === 'function') { before.call(null, app); }
  if (staticFiles) { attach.staticFiles(app, staticFiles); }
  if (testConf) { testable.attach(app, testConf); }
  if (routes) { attach.routes(app, routes); }
  if (proxy) { attach.proxy(app, proxy); }
  if (typeof after === 'function') { after.call(null, app); }

  app.listen(port, host, done);
};
