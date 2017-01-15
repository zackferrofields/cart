const { IO } = require('ramda-fantasy');
const {
  compose, slice, split, map, flatten, reject, isEmpty, toLower, __, multiply,
  reduceBy, inc, identity, uncurryN, reduce, toPairs, merge, over, lensProp,
  forEachObjIndexed, tap, add, always, unless, equals
} = require('ramda');

const items = {
  apple: { price: 25 },
  orange: { price: 30 },
  garlic: { price: 15 },
  papaya: { price: 50 }
};

const offerBuyX = uncurryN(3, x => y => z => (x ? z * - (Math.floor(y / x)) : 0));

items.papaya.offer = offerBuyX(3);

const argsIO = IO(() => slice(2, Infinity, process.argv));

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

const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

const countItems = reduceBy(inc, 0, identity);

const mergeItems = uncurryN(3, name => quantity =>
  over(lensProp(name), merge(__, { quantity })));

const reduceItems = reduce((acc, [name, quantity]) =>
  mergeItems(name, quantity, acc), items);

const main = argsIO
  .map(compose(countItems, parseList))
  .map(compose(reduceItems, toPairs))
  .chain(printIO);

main.runIO();
