const GoogleSpreadsheet = require('google-spreadsheet')
const prom = require('./promisifyWrapper')
const ch = require('console-hue')
const checkSettings = require('./checksettings')
const getSpreadObj = docid => new GoogleSpreadsheet(docid)
const sheets = {}

const getsCredsPath = filepath => `${process.cwd()}/${filepath}`

async function authorize (docid, credspath) {
  const doc = getSpreadObj(docid)
  const docUseServiceAsync = prom(doc.useServiceAccountAuth)
  const docInfoAsync = prom(doc.getInfo)
  const creds = require(getsCredsPath(credspath))
  await docUseServiceAsync(creds)
  const info = await docInfoAsync()
  return info.worksheets
}

async function getSheet (params) {
  const check = await checkSettings(params)
  if (!check) return
  if (!sheets[params.sheetid]) {
    sheets[params.sheetid] = await authorize(params.docid, params.credspath)
    ch.success('Spreadsheet initialized')
  }
  return sheets[params.sheetid].filter(x => x.title === params.sheetid)[0]
}

module.exports = getSheet
