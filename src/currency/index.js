const { divide, uncurryN, merge } = require('ramda');

const DEFAULT_OPTIONS = { style: 'currency' };

const currency = uncurryN(4, locale => options => denom => amount =>
  divide(amount, denom).toLocaleString(locale, merge(DEFAULT_OPTIONS, options)));

currency.toGBP = currency('en-GB', { currency: 'GBP' }, 100);

module.exports = currency;
