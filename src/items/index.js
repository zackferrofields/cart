const {
  __, compose, filter, flatten, identity, inc, isEmpty, lensProp, lt, map, merge,
  over, propOr, reduce, reduceBy, reject, split, toLower, toPairs, uncurryN
} = require('ramda');
const { BxGOF } = require('../offers');

const items = {
  apple: { price: 25 },
  orange: { price: 30 },
  garlic: { price: 15 },
  papaya: { price: 50 }
};

// :: Number -> Number -> Number
items.papaya.offer = BxGOF(3);

// :: [[String]] -> [String]
const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

// :: [String] -> Object
const countItems = reduceBy(inc, 0, identity);

// :: String -> Number -> Object -> Object
const mergeItems = uncurryN(3, name => quantity =>
  over(lensProp(name), merge(__, { quantity })));

// :: Object -> Object
const reduceItems = reduce((acc, [name, quantity]) =>
  mergeItems(name, quantity, acc), items);

// :: Object -> Object
const filterItems = filter(compose(lt(0), propOr(0, 'quantity')));

// :: [[String]] -> Object
const listItems = compose(filterItems, reduceItems, toPairs, countItems, parseList);

module.exports = listItems;
