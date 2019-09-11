const { promisify } = require('util')
const checkSettings = require('./checksettings')
const getSheet = require('./getsheet')

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
