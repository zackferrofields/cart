const { IO } = require('ramda-fantasy');
const { slice } = require('ramda');
const printIO = require('./src/print');
const listItems = require('./src/items');

const argsIO = IO.of(slice(2, Infinity, process.argv));

const main = argsIO
  .map(listItems)
  .chain(printIO);

main.runIO();
