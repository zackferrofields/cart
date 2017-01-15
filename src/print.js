const { IO } = require('ramda-fantasy');
const {
  add, always, compose, equals, forEachObjIndexed,
  multiply, reduce, tap, toPairs, unless
} = require('ramda');

const printLn = data => process.stdout.write(`${data}\n`);

const printItem = ([{price = 0, quantity = 0}, name]) =>
  printLn(`${name} ${multiply(quantity, price)}`);

const printOffer = ([{price = 0, quantity = 0, offer = always(0)}]) =>
  unless(equals(0), printLn)(offer(quantity, price));

const printTotal = compose(
  printLn,
  tap(() => printLn('-----')),
  reduce((acc, [, {price = 0, quantity = 0, offer = always(0)}]) =>
    add(acc, add(offer(quantity, price), multiply(quantity, price))), 0),
  toPairs);

const printItems = tap(forEachObjIndexed((...args) =>
  compose(tap(printOffer), tap(printItem))(args)));

const printIO = data => IO(() => printItems(data) && printTotal(data));

module.exports = printIO;
