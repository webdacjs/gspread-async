const cache = require('simple-map-cache')

function setCache (params, type, value) {
  const { docid, sheetid } = params
  cache.set([docid, sheetid, type], value)
}

function getCache (params, type) {
  const { docid, sheetid, cached } = params
  if (!cached) {
    return
  }
  return cache.get([docid, sheetid, type])
}

module.exports = {
  setCache,
  getCache
}
