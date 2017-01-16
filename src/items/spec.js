const test = require('tape');
const items = require('./index');

test('items', t => {
  t.plan(2);
  t.is(typeof items, 'function');
  t.deepEqual(items(['apple', 'apple']), { apple: { price: 25, quantity: 2 } });
});
