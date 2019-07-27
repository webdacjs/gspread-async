const GoogleSpreadsheet = require('google-spreadsheet')
const {promisify} = require('util')
const ch = require('console-hue')
const getSpreadObj = docid => new GoogleSpreadsheet(docid)
const sheets = {}

async function authorize (docid, credspath) {
    const doc = getSpreadObj(docid)
    const docUseServiceAsync = promisify(doc.useServiceAccountAuth)
    const docInfoAsync = promisify(doc.getInfo)
    const creds = require(credspath)
    await docUseServiceAsync(creds)
    const info = await docInfoAsync()
    return info.worksheets
}

async function getSheet (params) {
    if (!sheets[params.sheetid]) {
        sheets[params.sheetid] = await authorize(params.docid, params.credspath)
        ch.success('Spreadsheet initialized')
    }
    return sheets[params.sheetid].filter(x => x.title === params.sheetid)[0]
}

async function getCells (params) {
    const options = params.options || {}
    const sh = await getSheet(params)
    const getCellsAsync = promisify(sh.getCells)
    const cells = await getCellsAsync(options)
    return cells
}

async function getRows (params) {
    const options = params.options || {}
    const sh = await getSheet(params)
    const getRowsAsync = promisify(sh.getRows)
    const rows = await getRowsAsync(options)
    return rows
}

async function addRow (params, row) {
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