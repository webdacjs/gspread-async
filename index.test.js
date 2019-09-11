
jest.mock('./getsheet.js')
jest.mock('./promisifyWrapper.js')

const prom = require('./promisifyWrapper.js')
const getSheet = require('./getsheet.js')
const { getRows, getCells } = require('./index.js')
const params = require('./sample.json')

prom.mockImplementation(fn => fn)

getSheet.mockImplementation(() => ({
  getRows: async (d) => {
    return [{ col1: 'value1' }]
  },
  getCells: async (d) => {
    return [{ cell1: 'value1' }]
  }
}))

test('Test getting rows from the spreadhseet', async () => {
  const rows = await getRows(params)
  expect(rows[0].col1).toBe('value1')
})

test('Test getting cells from the spreadhseet', async () => {
  const cells = await getCells(params)
  expect(cells[0].cell1).toBe('value1')
})
