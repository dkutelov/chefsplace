const fetchData = require('./fetchData');
const { covertItemsArrToObj } = require('../utils');

async function getAllItems() {
  const itemsRequest = {
    functionName: 'getItems',
    parameters: [],
    functionData: null,
  };
  const productsArr = await fetchData(itemsRequest);
  const productObj = covertItemsArrToObj(productsArr);
  return productObj;
}

module.exports = getAllItems;
