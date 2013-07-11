var httpProxy = require('http-proxy'),
    proxy     = new httpProxy.RoutingProxy(),
    util      = require('util');

module.exports = function(app, conf) {
  var order;
  if (util.isArray(conf)) {
    app.all('*', proxyRequest(conf));
  } else if (typeof conf === 'object') {
    if (conf.order) {
      order = conf.order;
      delete conf.order;
    } else {
      order = Object.keys(conf);
    }
    if (util.isArray(order)) {
      order.forEach(function(key) {
        app.all('*', proxyRequest(conf[key]));
      });
    }
  }
};

function proxyRequest(proxyTarget) {
  return function(req, res, next) {
    var shouldProxy = true, host, port;

    if (util.isArray(proxyTarget)) {
      theProxy = proxies.reduce(function(prev, current) {
        if (prev) return prev;
        if (current.path) return new RegExp('^' + current.path).test(req.url);
        return current;
      }, false);

      if (theProxy) {
        host = theProxy.host;
        port = theProxy.port;
      }
    } else if (typeof proxyTarget === 'object') {
      host = proxyTarget.host || 'localhost',
      port = proxyTarget.port || 80;
      if (proxyTarget.path) {
        if (util.isArray(proxyTarget.path)) {
          shouldProxy = proxyTarget.path.some(function(p) {
            return new RegExp('^' + p).test(req.url)
          });
        } else {
          shouldProxy = new RegExp('^' + proxyTarget.path).test(req.url)
        }
      }
    }
    if (shouldProxy && host && port) {
      proxy.proxyRequest(req, res, { host: host, port: port });
    } else {
      next();
    }
  };
}

