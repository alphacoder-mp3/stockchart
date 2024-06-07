import React, { useState } from 'react';
import SymbolInput from './SymbolInput';
import ChartComponent from './ChartComponent';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSymbolSubmit = (symbol, strikePrice, expiryDate) => {
    setSymbol(symbol);
    setStrikePrice(strikePrice);
    setExpiryDate(expiryDate);
  };

  return (
    <div>
      <div className="bg-cover bg-center h-screen flex justify-center items-center bg-neutral-900">
        <SymbolInput onSubmit={handleSymbolSubmit} />
        {symbol && strikePrice && expiryDate && (
          <ChartComponent
            symbol={symbol}
            strikePrice={strikePrice}
            expiryDate={expiryDate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
