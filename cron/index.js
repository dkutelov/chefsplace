const cron = require('node-cron');
const startCron = require('../generateReport');
const { fileLog } = require('../utils');

//change to "min hour * * *"
//'* * * * *' - every minute
cron.schedule('0 20 * * *', () => {
  console.log('running the cron task');
  fileLog('starting cron task');
  startCron();
});
