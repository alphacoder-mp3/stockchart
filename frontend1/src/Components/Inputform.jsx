import React, { useState } from 'react'

const inputform = ({onSubmit}) => {
  const [symbol, setSymbol] = useState("")
  const [expiry, setExpiry] = useState("")
  const [strike, setStrike] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(symbol, strike, expiry);
    onSubmit(symbol, strike, expiry);
  };

  return (
    <div className="flex justify-center mt-4">
      <form className="flex flex-col space-y-4 border p-4 rounded-[12px]">
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="border-2 rounded-lg shadow-lg shadow-slate-600" type="text" placeholder="Enter symbol" />
        <input value={strike} onChange={(e) => setStrike(e.target.value)} className="border-2 rounded-lg shadow-slate-600" type="text"  placeholder="Enter strikeprice" />
        <input value={expiry} onChange={(e) => setExpiry(e.target.value)} className="border-2 rounded-lg shadow-slate-600" type="text" placeholder="Enter expiry" />
        <button className = "bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default inputform;
