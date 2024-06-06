import React, { useState } from 'react';

import './symbolinput.css';

const SymbolInput = ({ onSubmit }) => {
  const [symbol, setSymbol] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'symbol') {
      setSymbol(value);
    } else if (name === 'strikePrice') {
      setStrikePrice(value);
    } else if (name === 'expiryDate') {
      setExpiryDate(value);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(symbol, strikePrice, expiryDate);
  // };
  const handleSubmit = event => {
    console.log('clicked');
    event.preventDefault();
    const formattedSymbol =
      '[' +
      symbol
        .split(',')
        .map(s => `"${s.trim()}"`)
        .join(',') +
      ']';
    const formattedStrikePrice =
      '[' +
      strikePrice
        .split(',')
        .map(s => `"${s.trim()}"`)
        .join(',') +
      ']';
    const formattedExpiryDate =
      '[' +
      expiryDate
        .split(',')
        .map(s => `"${s.trim()}"`)
        .join(',') +
      ']';
    onSubmit(formattedSymbol, formattedStrikePrice, formattedExpiryDate);
  };

  //create input field for symbol and strike price and expiry date also provide css

  return (
    <div className="top-centered-div">
      <h1 className="font-bold mt-5 text-white">Option Chain Data</h1>

      <div className="flex-container flex-wrap ">
        <input
          className="styled-input mt-4"
          type="text"
          name="symbol"
          value={symbol}
          onChange={handleChange}
          placeholder="Enter symbol..."
        />
        <input
          className="styled-input  mt-4 "
          type="text"
          name="strikePrice"
          value={strikePrice}
          onChange={handleChange}
          placeholder="Enter strike price..."
        />
        <input
          className="styled-input  mt-4 "
          type="text"
          name="expiryDate"
          value={expiryDate}
          onChange={handleChange}
          placeholder="Enter expiry date..."
        />
        <div className="mt-2">
          <button onClick={handleSubmit} className="centered-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolInput;
