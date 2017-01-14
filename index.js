const { Future } = require('ramda-fantasy');
const {
  compose, slice, split, map, flatten, reject, isEmpty, toLower,
  reduceBy, inc, identity, uncurryN
} = require('ramda');

const reduceItems = reduceBy(inc, 0, identity);

const offer = uncurryN(2, x => y => y - (Math.floor(y / x)));

const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

const list = Future.of(slice(2, Infinity, process.argv))
  .map(parseList)
  .map(reduceItems);

list
  .fork(console.error, console.log);
