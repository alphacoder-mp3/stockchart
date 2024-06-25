const fetchData = async (symbolsArray, strikesArray, expiriesArray) => {
  const url = `http://localhost:8000/option-data?symbol=${JSON.stringify(
    symbolsArray
  )}&strikeprice=${JSON.stringify(strikesArray)}&expiryDate=${JSON.stringify(
    expiriesArray
  )}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const jsonData = await response.json();
  return jsonData;
};

export default fetchData;
