const { IO } = require('ramda-fantasy');
const {
  add, always, compose, equals, forEachObjIndexed,
  multiply, reduce, tap, toPairs, unless
} = require('ramda');

const printItem = ([{price = 0, quantity = 0}, name]) =>
  process.stdout.write(`${name} ${multiply(quantity, price)}\n`);

const printOffer = ([{price = 0, quantity = 0, offer = always(0)}]) =>
  unless(equals(0), amount => process.stdout.write(`${amount}\n`))(offer(quantity, price));

const printTotal = compose(
  total => process.stdout.write(`-----\n${total}\n`),
  reduce((acc, [, {price = 0, quantity = 0, offer = always(0)}]) =>
    add(acc, add(offer(quantity, price), multiply(quantity, price))), 0),
  toPairs);

const printItems = forEachObjIndexed((...args) =>
  compose(tap(printOffer), tap(printItem))(args));

const printIO = data => IO(() => printItems(data) && printTotal(data));

module.exports = printIO;
