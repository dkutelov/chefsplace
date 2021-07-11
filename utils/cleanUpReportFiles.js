const fs = require('fs');
const path = require('path');

function cleanUpReports() {
  console.log('start');
  const directory = path.resolve('./reports');
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

module.exports = cleanUpReports;
