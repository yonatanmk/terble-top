const _ = require('lodash');

const hasKeys = (obj, keys) => {
  if (!keys) {
    return false;
  }
  return _.every(keys, _.partial(_.has, obj));
};

module.exports = { hasKeys };
