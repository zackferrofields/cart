const test = require('tape');
const currency = require('./index');

const locale = 'en-GB';
const options = { currency: 'GBP' };
const denominator = 100;
const toGBP = currency(locale, options, denominator);

test('currency', t => {
  t.plan(4);
  t.is(typeof currency, 'function');
  t.equals(toGBP(100), '£1.00');
  t.is(typeof currency.toGBP, 'function');
  t.equals(toGBP(50), '£0.50');
});
