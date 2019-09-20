const prom = require('./promisifyWrapper')
const getSheet = require('./getsheet')
const { getCache, setCache } = require('./cache.js')

async function getCells (params) {
  const cached = getCache(params, 'cells')
  if (cached) return cached
  const sh = await getSheet(params)
  if (!sh) return
  const options = params.options || {}
  const getCellsAsync = prom(sh.getCells)
  const cells = await getCellsAsync(options)
  setCache(params, 'cells', cells)
  return cells
}

async function getRows (params) {
  const cached = getCache(params, 'rows')
  if (cached) return cached
  const sh = await getSheet(params)
  if (!sh) return
  const options = params.options || {}
  const getRowsAsync = prom(sh.getRows)
  const rows = await getRowsAsync(options)
  setCache(params, 'rows', rows)
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
