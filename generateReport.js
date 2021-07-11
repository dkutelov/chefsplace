const getSalesData = require('./getSourseData/getSalesData');
const addPartnerDetails = require('./getSourseData/addPartnerDetails');
const addItemsDetails = require('./getSourseData/addItemsDetails');
const getAllItems = require('./getSourseData/getAllItems');
const createXML = require('./createXML');
const createXMLFile = require('./createXML/createXMLFile');
const { fileLog } = require('./utils');

function startCron() {
  let trialCount = 5;
  generateReport();

  function restartJob(msg) {
    if (trialCount === 0) return;

    setTimeout(() => {
      fileLog(msg);
      generateReport();
      trialCount -= 1;
    }, 10000);
  }
  // chain promisses to reduce to one error handling
  function generateReport() {
    let queryData;
    let items;
    getAllItems()
      .then((itemsObj) => {
        // status
        items = itemsObj;

        getSalesData()
          .then((sales) => {
            queryData = sales;

            addPartnerDetails(sales)
              .then((data) => {
                fileLog('Report data fetched successfully');
                queryData = data;
                const finalData = addItemsDetails(queryData, items);
                const xmlContent = createXML(finalData);

                createXMLFile(xmlContent);
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
