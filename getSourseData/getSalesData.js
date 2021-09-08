const fetchData = require('./fetchData');
const { getCurrentDateString } = require('../utils');

//const todayDate = getCurrentDateString();
//let todayDate = new Date().toISOString().substring(0, 10);
async function getSalesData(date) {
  const salesRequest = {
    functionName: 'getOperations',
    parameters: {
      OperType: 2,
      fromDate: `${date.toISOString().substring(0, 10)} 00:00:00`,
    },
    functionData: null,
  };
  const sales = await fetchData(salesRequest);
  return sales;
}

module.exports = getSalesData;
