var path = require('path'),
    util = require('util');

module.exports = function (app, conf) {
  if (typeof conf === 'string') {
    app.use(express.static(path.join(process.cwd(), conf)));
  } else if (util.isArray(conf)) {
    conf.forEach(function(p) {
      app.use(express.static(path.join(process.cwd(), conf)));
    });
  }
};
