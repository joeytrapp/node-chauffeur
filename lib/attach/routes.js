var path = require('path'),
    util = require('util');

module.exports = function (app, conf) {
  if (typeof conf === 'string') {
    require(path.normalize(path.join(process.cwd(), conf))).call(this, app);
  } else if (util.isArray(conf)) {
    conf.forEach(function(p) {
      require(path.normalize(path.join(process.cwd(), p))).call(this, app);
    });
  }
};
