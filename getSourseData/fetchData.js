const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const FormData = require('form-data');
const config = require('../config/config');
const { fileLog } = require('../utils');

function fetchData(request) {
  const jsonRequest = JSON.stringify(request);

  let buffer = Buffer.from(jsonRequest, 'utf-8');
  const base64Request = buffer.toString('base64');
  const encoded = encodeURI(base64Request);
  const hash = CryptoJS.HmacSHA256(encoded, config.secretKey).toString(
    CryptoJS.enc.Hex,
  );
  const requestHash = encoded + hash;

  var form = new FormData({
    boundary: 'cool boundary',
  });
  form.append('ApiId', config.ApiId);
  form.append('Request', requestHash);

  return fetch(config.baseURL, {
    method: 'POST',
    body: form,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.text();
    })
    .then((rawResponse) => {
      const response = JSON.parse(rawResponse);
      const data = response.data;
      return data;
    });
}

module.exports = fetchData;
