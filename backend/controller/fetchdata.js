const fetchOptionData = require("../middleware/fetchoptionsdata");
exports.fetchdata = async (req, res) => {
  const symbol = JSON.parse(req.query.symbol); // Get the symbol from the query parameters
  const strikeprice = JSON.parse(req.query.strikeprice); // Get the strike price from the query parameters
  console.log(strikeprice);
  const expiryDate = JSON.parse(req.query.expiryDate); // Get the expiry date from the query parameters
  console.log(req.query.expiryDate);

  if (!symbol) {
    return res.status(400).json({ error: "Symbol parameter is required" });
  }

  const results = await Promise.all(
    symbol.map(async (symbol) => {
      const data = await fetchOptionData.fetchOptionData(symbol);
      return { symbol, data };
    })
  );

  const data1 = results.map(({ symbol, data }) => {
    console.log(data.CE);

    const CEData = data.CE.find(
      (option) =>
        option.strikePrice === parseInt(strikeprice[0]) &&
        option.expiryDate.toLowerCase() === expiryDate[0].toLowerCase()
    );

    const PEData = data.PE.find(
      (option) =>
        option.strikePrice === parseInt(strikeprice[0]) &&
        option.expiryDate.toLowerCase() === expiryDate[0].toLowerCase()
    );

    console.log(`CEData for ${symbol}: `, CEData);
    console.log(`PEData for ${symbol}: `, PEData);

    return { symbol, finaldata: [CEData, PEData] };
  });

  if (data1) {
    res.status(200).json(data1);
  } else {
    res.status(500).json({ error: "Failed to fetch option data" });
  }
};
