import React, { useState } from 'react';
import { toast } from 'sonner';

const Inputform = () => {
  const [symbol, setSymbol] = useState('');
  const [expiry, setExpiry] = useState('');
  const [strike, setStrike] = useState('');
  const [data, setData] = useState([]);

  const getdata = async e => {
    e.preventDefault();
    try {
      const url = `http://localhost:8000/option-data?symbol=${symbol}&strikeprice=${strike}&expiryDate=${expiry}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
      setSymbol('');
      setExpiry('');
      setStrike('');
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Error while fetching data');
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <form
        className="flex flex-col space-y-4 border p-4 rounded-[12px]"
        onSubmit={getdata}
      >
        <input
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          className="border-2 rounded-lg shadow-lg shadow-slate-600"
          type="text"
          placeholder="Enter symbol"
        />
        <input
          value={strike}
          onChange={e => setStrike(e.target.value)}
          className="border-2 rounded-lg shadow-slate-600"
          type="text"
          placeholder="Enter strikeprice"
        />
        <input
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          className="border-2 rounded-lg shadow-slate-600"
          type="text"
          placeholder="Enter expiry"
        />
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div>
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index}>
              {/* Adjust the rendering of data according to its structure */}
              <p>{JSON.stringify(item)}</p>
            </div>
          ))
        ) : (
          <p>{JSON.stringify(data)}</p>
        )}
      </div>
    </div>
  );
};

export default Inputform;
