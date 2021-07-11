const fetchData = require("./fetchData");

const getPartner = async (sale) => {
  const partnerRequest = {
    functionName: "getPartners",
    parameters: { Id: `${sale.PartnerId}` },
    functionData: null,
  };
  return fetchData(partnerRequest);
};

async function addPartnerDetails(data) {
  return Promise.all(
    data.map(async (sale) => {
      const partner = await getPartner(sale);
      sale.partner = partner[0];
      return sale;
    }),
  );
}

module.exports = addPartnerDetails;
