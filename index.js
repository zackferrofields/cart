const { IO } = require('ramda-fantasy');
const {
  compose, slice, split, map, flatten, reject, isEmpty, toLower,
  reduceBy, inc, identity, uncurryN
} = require('ramda');

const argsIO = IO(() => slice(2, Infinity, process.argv));

const logIO = data => IO(() => console.log(data));

const reduceItems = reduceBy(inc, 0, identity);

const offer = uncurryN(2, x => y => y - (Math.floor(y / x)));

const parseList = compose(reject(isEmpty), flatten, map(compose(split(','), toLower)));

const main = argsIO
  .map(compose(reduceItems, parseList))
  .chain(logIO);

main.runIO();
