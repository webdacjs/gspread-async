# gspread-async

This module provides a wrapper for the google-spreadsheet module, exposing a subset of the most common used functionalities, using a modern async interface.

*Note: The module relies on the service account authentication method described in the [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) module.*


## Install

You can install with [npm]:

```sh
$ npm install --save gspread-async


```

## Usage

You need to define an object with 3 parameters in order to get or write data to an spreadsheet:

1. The gooogle spreadsheet id.
1. The name of sheet you want to use.
1. The path of the JSON file containing the authentication credentials.

```js
const parameters = {
    docid: '<your spreadsheetid>',
    credspath: '<your path with the google credentials file>',
    sheetid: '<your sheetid>'
}
```

Once you have this object you can use it to either `getRows`, `getCells` or `addRow` to a particular sheet:

```js

const gspreadasync = require('gspread-async')

const parameters = {
    docid: '<your spreadsheetid>',
    credspath: '<your path with the google credentials file>',
    sheetid: '<your sheetid>'
}

async function test () {
  // Get Rows
  const rows = await gspreadasync.getRows(parameters)
  // Get Cells
  const cells = await gspreadasync.getCells(parameters)
  // Add Row. The column names have to match the ones in the spreadsheet
  const cells = await gspreadasync.getCells(parameters, {col1: 'val1', col2: 'val2'})
}

test()

```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com/).
Released under the [MIT License](LICENSE).