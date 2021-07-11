const http = require('http');
require('./cron');

console.log('Script started');

http
  .createServer(function (req, res) {
    res.write('Working!');
    res.end();
  })
  .listen(process.env.PORT || 5000);
