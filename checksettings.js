const prom = require('./promisifyWrapper')
const fs = require('fs')
const fsAccessAsync = prom(fs.access)
const ch = require('console-hue')

const getsCredsPath = filepath => `${process.cwd()}/${filepath}`

async function fileExists (filepath) {
  try {
    await fsAccessAsync(filepath, fs.F_OK)
    return
  } catch (err) {
    return err.code
  }
}

module.exports = async function (params = {}) {
  if (!params.credspath || !params.docid && !params.sheetid) {
    ch.error('Missing spreadsheet parameters check your settings object')
    return
  }
  const credsfileMissing = await fileExists(getsCredsPath(params.credspath))
  if (credsfileMissing) {
    ch.error('Missing credentials file.')
    return
  }
  return true
}