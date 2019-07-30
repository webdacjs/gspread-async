const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')
const fs = require('fs')
const fsAccessAsync = promisify(fs.access)
const ch = require('console-hue')
const getSpreadObj = docid => new GoogleSpreadsheet(docid)
const sheets = {}

const getsCredsPath = filepath => `${process.cwd()}/${filepath}`

async function fileExists (filepath) {
  try {
    await fsAccessAsync(filepath, fs.F_OK)
    return
  } catch (err) {
    return err.code
  }
}

async function checkSettings (params = {}) {
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

async function authorize (docid, credspath) {
  const doc = getSpreadObj(docid)
  const docUseServiceAsync = promisify(doc.useServiceAccountAuth)
  const docInfoAsync = promisify(doc.getInfo)
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

async function getCells (params) {
  const check = await checkSettings(params)
  if (!check) return
  const options = params.options || {}
  const sh = await getSheet(params)
  const getCellsAsync = promisify(sh.getCells)
  const cells = await getCellsAsync(options)
  return cells
}

async function getRows (params) {
  const check = await checkSettings(params)
  if (!check) return
  const options = params.options || {}
  const sh = await getSheet(params)
  const getRowsAsync = promisify(sh.getRows)
  const rows = await getRowsAsync(options)
  return rows
}

async function addRow (params, row) {
  const check = await checkSettings(params)
  if (!check) return
  const sh = await getSheet(params)
  const addRowAsync = promisify(sh.addRow)
  const results = await addRowAsync(row)
  return results
}

module.exports = {
  getSheet,
  getRows,
  getCells,
  addRow
}
