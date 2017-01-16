const {
  __, compose, filter, flatten, identity, inc, isEmpty, lensProp, lt, map, merge,
  over, propOr, reduce, reduceBy, reject, split, toLower, toPairs, uncurryN
} = require('ramda');

const items = {
  apple: { price: 25 },
  orange: { price: 30 },
  garlic: { price: 15 },
  papaya: { price: 50 }
};

const offerBuyX = uncurryN(3, x => y => z => (x ? z * - (Math.floor(y / x)) : 0));

items.papaya.offer = offerBuyX(3);

const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

const countItems = reduceBy(inc, 0, identity);

const mergeItems = uncurryN(3, name => quantity =>
  over(lensProp(name), merge(__, { quantity })));

const reduceItems = reduce((acc, [name, quantity]) =>
  mergeItems(name, quantity, acc), items);

const filterItems = filter(compose(lt(0), propOr(0, 'quantity')));

const listItems = compose(filterItems, reduceItems, toPairs, countItems, parseList);

module.exports = listItems;
