const productCodesToExclude = [
  '806',
  '802',
  '15381608',
  '27049901',
  '19756603',
  '67216785',
  '68187888',
];

function isException(productCode) {
  return productCodesToExclude.some((x) => x === productCode);
}

module.exports = {
  isException,
};
