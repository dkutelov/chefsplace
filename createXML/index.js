const { create } = require('xmlbuilder2');
const config = require('../config/config');
const { fileLog } = require('../utils');
const addInvoicesData = require('./addInvoicesData');

function createXML(invoices) {
  const currentDate = new Date().toISOString();

  let xmlContent = create({
    version: '1.0',
    encoding: 'UTF-8',
  }).ele('Invoices', {
    created: currentDate,
    comment: `Report from Chefsplace for sales invoiced on ${currentDate}`,
    distributorid: config.distributorId,
    'xsi:noNamespaceSchemaLocation': 'XS_UnileverSSD_DIST.xsd',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  });

  if (invoices.length > 0) {
    xmlContent = addInvoicesData(xmlContent, invoices);
  } else {
    xmlContent.txt('\n');
  }

  const xml = xmlContent.end({ prettyPrint: true });

  return xml;
}

module.exports = createXML;
