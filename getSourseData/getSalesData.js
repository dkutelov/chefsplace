const fetchData = require('./fetchData');
const { getCurrentDateString } = require('../utils');

const todayDate = getCurrentDateString();

async function getSalesData() {
  const salesRequest = {
    functionName: 'getOperations',
    parameters: { OperType: 2, fromDate: `${todayDate} 00:00:00` },
    functionData: null,
  };
  const sales = await fetchData(salesRequest);
  return sales;
}

module.exports = getSalesData;
