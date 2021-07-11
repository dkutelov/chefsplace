const productCodesToExclude = [
  '806',
  '802',
  '15381608',
  '27049901',
  '19756603',
  '67216785',
];
// 806 - доставка
// 802 - домати нарязани
// 15381608 - Растителен крем за готвене 15%  1л
// 27049901 - Растителен крем за готвене 31%.  1л
// 19756603 - RAMA комби Профи 3.7л

function isException(productCode) {
  return productCodesToExclude.some((x) => x === productCode);
}

module.exports = {
  isException,
};
