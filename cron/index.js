const cron = require('node-cron');
const startCron = require('../generateReport');
const { fileLog } = require('../utils');

//change to "min hour * * *"
//0 20 * * *'
cron.schedule('* * * * *', () => {
  console.log('running the cron task');
  fileLog('starting cron task');
  startCron();
});
