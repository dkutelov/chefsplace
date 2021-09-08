const getSalesData = require('./getSourseData/getSalesData');
const addPartnerDetails = require('./getSourseData/addPartnerDetails');
const addItemsDetails = require('./getSourseData/addItemsDetails');
const getAllItems = require('./getSourseData/getAllItems');
const createXML = require('./createXML');
const createXMLFile = require('./createXML/createXMLFile');
const { fileLog } = require('./utils');

function startCron(date) {
  let trialCount = 5;
  generateReport(date);

  function restartJob(msg) {
    if (trialCount === 0) return;

    setTimeout(() => {
      fileLog(msg);
      generateReport(date);
      trialCount -= 1;
    }, 10000);
  }

  // chain promisses to reduce to one error handling
  function generateReport(date) {
    let queryData;
    let items;
    getAllItems()
      .then((itemsObj) => {
        // status
        items = itemsObj;

        getSalesData(date)
          .then((sales) => {
            queryData = sales;

            addPartnerDetails(sales)
              .then((data) => {
                fileLog('Report data fetched successfully');
                queryData = data;
                const finalData = addItemsDetails(queryData, items);
                const xmlContent = createXML(finalData);

                createXMLFile(xmlContent, date);
              })
              .catch((err) => {
                console.log(err);
                fileLog(err);
                restartJob('Job restarted due to fetch error');
              });
          })
          .catch((err) => {
            console.log(err);
            fileLog(err);
            restartJob('Job restarted due to fetch error');
          });
      })
      .catch((err) => {
        console.log(err);
        fileLog(err);
        restartJob('Job restarted due to fetch error');
      });
  }
}
module.exports = startCron;
