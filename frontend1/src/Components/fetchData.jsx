import React, { useEffect, useState } from 'react';

const fetchData = ({ symbol, expiry, strike }) => {
  console.log(symbol, expiry, strike);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const url = `http://localhost:8000/option-data?symbol=${symbol}&strikeprice=${strike}&expiryDate=${expiry}`;
      console.log(url);
      const data = await fetch(url);
      const jsondata = await data.json();
      console.log(jsondata);
      setData(jsondata);
    };
    getdata();
  }, [symbol, strike, expiry]);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default fetchData;
