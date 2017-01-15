const { IO } = require('ramda-fantasy');
const {
  compose, slice, split, map, flatten, reject, isEmpty, toLower, __, multiply,
  reduceBy, inc, identity, uncurryN, reduce, toPairs, merge, over, lensProp,
} = require('ramda');

const items = {
  apple: { price: 25 },
  orange: { price: 30 },
  garlic: { price: 15 },
  papaya: { price: 50, offer: 3 }
};

const argsIO = IO(() => slice(2, Infinity, process.argv));

const logIO = data => IO(() => console.log(data));

const countItems = reduceBy(inc, 0, identity);

const mergeItems = uncurryN(3, name => quantity =>
  over(lensProp(name), merge(__, { quantity })));

const reduceItems = reduce((acc, [name, quantity]) =>
  mergeItems(name, quantity, acc), items);

const offer = uncurryN(2, x => y => y - (Math.floor(y / x)));

const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

const main = argsIO
  .map(compose(countItems, parseList))
  .map(compose(reduceItems, toPairs))
  .chain(logIO);

main.runIO();
