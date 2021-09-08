const { isException } = require('../utils/exception');

function addInvoicesData(xmlContent, invoices) {
  invoices.forEach((inv) => {
    if (inv.OperType !== '2' || !inv.InvoiceNr) return;
    const isEcommerce = !inv.partner.City.toLowerCase().includes('софия');
    const itemsWithoutInvalidProducts = inv.items.filter(
      (item) => !isException(item.code),
    );

    console.log('itemsWithoutInvalidProducts', itemsWithoutInvalidProducts);

    if (itemsWithoutInvalidProducts.length === 0) return;

    const invoice = xmlContent
      .ele('invoice')
      .ele('InvoiceId')
      .txt(inv.InvoiceNr)
      .up()
      .ele('InvoiceDate')
      .txt(inv.InvoiceDate)
      .up()
      .ele('BillToId')
      .txt(inv.partner.id)
      .up()
      .ele('BillToName')
      .txt(inv.partner.Name.trim())
      .up()
      .ele('BillToCountry')
      .txt('BG')
      .up()
      .ele('BillToCity')
      .txt(inv.partner.City.toUpperCase() || 'СОФИЯ')
      .up()
      .ele('BillToPostcode')
      .txt('1000')
      .up()
      .ele('BillToAddress')
      .txt(inv.partner.Address.trim())
      .up()
      .ele('ShipToId')
      .txt(inv.partner.id)
      .up()
      .ele('ShipToName')
      .txt(inv.partner.Name.trim())
      .up()
      .ele('ShipToCountry')
      .txt('BG')
      .up()
      .ele('ShipToCity')
      .txt(inv.partner.City.toUpperCase() || 'СОФИЯ')
      .up()
      .ele('ShipToPostcode')
      .txt('1000')
      .up()
      .ele('ShipToAddress')
      .txt(inv.partner.Address.trim())
      .up()
      .ele('SalesId')
      .txt(inv.Acct)
      .up()
      .ele('CompanyRegister')
      .txt(inv.partner.TaxID)
      .up()
      .ele('IsSubDistributor')
      .txt('false')
      .up()
      .ele('IsEcommerce')
      .txt(isEcommerce)
      .up()
      .ele('items');

    itemsWithoutInvalidProducts.forEach((i) => {
      const item = invoice
        .ele('invoiceitem')
        .ele('ItemId')
        .txt(i.id)
        .up()
        .ele('mrdr')
        .txt(i.code.trim())
        .up()
        .ele('Name')
        .txt(i.name.trim())
        .up()
        .ele('UoM')
        .txt('PC')
        .up()
        .ele('Quantity')
        .txt(Number(i.quantity))
        .up()
        .ele('Price')
        .txt(Number(i.price).toFixed(2))
        .up();
    });
  });

  return xmlContent;
}

module.exports = addInvoicesData;
