const fs = require('fs');
const path = require('path');
const Client = require('ssh2-sftp-client');
const { fileLog } = require('../utils');
const cleanUpReportFiles = require('../utils/cleanUpReportFiles');
const { configObj } = require('../config/config');

let client = new Client();

function uploadReportToSftp(fileName) {
  const localFile = fs.createReadStream(path.resolve(`./reports/${fileName}`));
  let remoteFile = `./${fileName}`;

  client
    .connect(configObj)
    .then(() => {
      client
        .put(localFile, remoteFile, {
          flags: 'w',
          encoding: 'UTF-8',
          autoClose: true,
          mode: 0o666,
        })
        .then(() => {
          console.log('file uploaded');
          fileLog(`Success: file: ${fileName} uploaded to sftp server.`);
          client.end();
          cleanUpReportFiles();
          fileLog(`file: ${fileName} deleted from the local server.`);
          console.log('file deleted');
        });
    })
    .catch((err) => {
      fileLog(
        `Error: ${fileName} was not uploaded to the sftp server. ${err.message}`,
      );
      console.error(err.message);
      // retry
    });
}

module.exports = uploadReportToSftp;
