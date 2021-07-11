const fs = require('fs');
const path = require('path');
const uploadReportToSftp = require('../uploadReportToSftp');
const { fileLog } = require('../utils');

function createXMLFile(xmlContent) {
  const currentDate = new Date()
    .toISOString()
    .substring(0, 10)
    .split('-')
    .join('');
  //const currentDate = '20210629';

  const fileName = `Chefsplace_inv_${currentDate}.xml`;
  fs.writeFile(
    path.resolve(__dirname, `../reports/${fileName}`),
    xmlContent,
    function (err, data) {
      if (err) console.log(err);

      console.log('successfully written our update xml to file');
      fileLog(`XML file: ${fileName} created`);

      uploadReportToSftp(fileName);
    },
  );
}

module.exports = createXMLFile;
