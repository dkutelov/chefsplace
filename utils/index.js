const fs = require('fs');
const path = require('path');

function getCurrentDateString() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = today.getDate();
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
  //return '20210712';
}

function covertItemsArrToObj(itemsArr) {
  return itemsArr.reduce((acc, curr) => {
    const itemNameLowerCased = curr.Name.toLowerCase();
    const isBrandNeeded = [
      itemNameLowerCased.includes('dove'),
      itemNameLowerCased.includes('domestos'),
      itemNameLowerCased.includes('coccolino'),
      itemNameLowerCased.includes('cocolino'),
      itemNameLowerCased.includes('omo'),
      itemNameLowerCased.includes('rexona'),
      itemNameLowerCased.includes('tresemme'),
      itemNameLowerCased.includes('schmidts'),
      itemNameLowerCased.includes('cif'),
      itemNameLowerCased.includes('savo'),
    ].some((x) => x);

    if (isBrandNeeded) {
      return acc;
    }

    acc[curr.id] = {
      id: curr.id,
      code: curr.Code,
      barcode: curr.Barcode,
      name: curr.Name,
    };
    return acc;
  }, {});
}

function renameObjKeys(obj) {
  return {
    InvoiceId: obj.id,
    InvoiceType: 'N',
    InvoiceDate: obj.DateIssued.slice(10),
  };
}

function fileLog(msg) {
  console.log(msg);
  const date = new Date();
  const logFile = fs.createWriteStream(path.resolve('./logs/log.txt'), {
    flags: 'a',
  });
  logFile.write(
    `${date.toLocaleDateString()}-${date.toLocaleTimeString()}: ${msg}\n`,
  );
  logFile.end();
}

module.exports = {
  getCurrentDateString,
  covertItemsArrToObj,
  renameObjKeys,
  fileLog,
};
