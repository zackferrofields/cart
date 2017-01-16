const test = require('tape');
const { format, toGBP } = require('./index');

const locale = 'en-GB';
const options = { currency: 'GBP' };
const denominator = 100;

test('currency', t => {
  t.plan(4);
  t.is(typeof format, 'function');
  t.equals(format(locale, options, denominator)(100), '£1.00');
  t.is(typeof toGBP, 'function');
  t.equals(toGBP(50), '£0.50');
});
