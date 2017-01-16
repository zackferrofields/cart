const { IO } = require('ramda-fantasy');
const {
  add, always, compose, equals, forEachObjIndexed,
  multiply, reduce, tap, toPairs, unless
} = require('ramda');
const { toGBP } = require('./currency');

const printLn = data => process.stdout.write(`${data}\n`);

const printItem = ([{price = 0, quantity = 0}, name]) =>
  printLn(`${name} ${toGBP(multiply(quantity, price))}`);

const printOffer = ([{price = 0, quantity = 0, offer = always(0)}]) =>
  unless(equals(0), compose(printLn, toGBP))(offer(quantity, price));

const printTotal = tap(compose(
  printLn,
  tap(() => printLn('-----')),
  toGBP,
  reduce((acc, [, {price = 0, quantity = 0, offer = always(0)}]) =>
    add(acc, add(offer(quantity, price), multiply(quantity, price))), 0),
  toPairs));

const printItems = tap(forEachObjIndexed((...args) =>
  compose(tap(printOffer), tap(printItem))(args)));

const printIO = data => IO(() => printItems(data) && printTotal(data));

module.exports = printIO;
