const fetchOptionData = require("../middleware/fetchoptionsdata");

exports.getData = async (req, res) => {
  try {
    const symbol = JSON.parse(req.query.symbol); // Get the symbol from the query parameters

    console.log(symbol);
    if (!symbol) {
      return res.status(400).json({ error: "Symbol parameter is required" });
    }

    const results = await Promise.all(
      symbol.map(async (symbol) => {
        const data = await fetchOptionData.fetchOptionData(symbol);
        const data1 = data.CE.map((item) => {
          let strikePrice = item.strikePrice;
          let expiryDate = item.expiryDate;

          return { symbol, strikePrice, expiryDate };
        });
        return data1;
      })
    );

    // console.log(results);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
