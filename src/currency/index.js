const { divide, uncurryN, merge } = require('ramda');

const DEFAULT_OPTIONS = { style: 'currency' };

// :: String -> Object -> Number -> Number -> String
const format = uncurryN(4, locale => options => denom => amount =>
  divide(amount, denom).toLocaleString(locale, merge(DEFAULT_OPTIONS, options)));

// :: Number -> String
const toGBP = format('en-GB', { currency: 'GBP' }, 100);

module.exports = {
  format, toGBP
};
