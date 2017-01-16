const test = require('tape');
const { BxGOF } = require('./index');

test('offers', t => {
  t.plan(3);
  t.is(typeof BxGOF, 'function');
  t.equals(BxGOF(3, 1, 100), 0);
  t.equals(BxGOF(3, 3, 100), -100);
});
