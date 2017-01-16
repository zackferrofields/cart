const { uncurryN } = require('ramda');

// :: Number -> Number -> Number -> Number -> Number
const BxGxF = uncurryN(4, free => buy => quantity => price =>
  (free ? price * - ((Math.floor(quantity / buy) * free)) : 0));

// :: Number -> Number -> Number -> Number
const BxGOF = BxGxF(1);

// :: Number -> Number -> Number
const BOGOF = BxGxF(1, 1);

module.exports = {
  BxGxF,
  BxGOF,
  BOGOF
};
