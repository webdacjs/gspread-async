const prom = require('./promisifyWrapper')
const getSheet = require('./getsheet')

async function getCells (params) {
  const sh = await getSheet(params)
  if (!sh) return
  const options = params.options || {}
  const getCellsAsync = prom(sh.getCells)
  const cells = await getCellsAsync(options)
  return cells
}

async function getRows (params) {
  const sh = await getSheet(params)
  if (!sh) return
  const options = params.options || {}
  const getRowsAsync = prom(sh.getRows)
  const rows = await getRowsAsync(options)
  return rows
}

async function addRow (params, row) {
  const sh = await getSheet(params)
  if (!sh) return
  const addRowAsync = prom(sh.addRow)
  const results = await addRowAsync(row)
  return results
}

module.exports = {
  getSheet,
  getRows,
  getCells,
  addRow
}
