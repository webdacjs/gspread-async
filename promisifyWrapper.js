const { promisify } = require('util')

module.exports = function (fn) {
  return promisify(fn)
}
