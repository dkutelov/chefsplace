function addItemsDetails(data, items) {
  return data.map((invoice) => {
    invoice.items = invoice.Items.map((item) => ({
      quantity: item.Qtty,
      price: item.PriceOut,
      vat: item.VatOut,
      discount: item.Discount,
      ...items[item.ItemId],
    }));
    delete invoice.Items;
    return invoice;
  });
}

module.exports = addItemsDetails;
