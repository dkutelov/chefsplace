const cron = require('node-cron');
const startCron = require('../generateReport');
const { fileLog } = require('../utils');

var date;
//change to "min hour * * *"
//'* * * * *' - every minute
cron.schedule('* * * * *', () => {
  // date = undefined;
  // date = new Date();
  let today = new Date();
  let date = new Date();
  date.setDate(today.getDate() - 1);
  console.log('running the cron task');
  fileLog(`starting cron task on ${date}`);
  startCron(date);
});
