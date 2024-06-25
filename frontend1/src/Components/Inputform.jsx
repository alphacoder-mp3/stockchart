// import React, { useState } from 'react';
// import { toast } from 'sonner';

// const Inputform = ({setData}) => {
//   const [symbol, setSymbol] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [strike, setStrike] = useState('');
//   // const [data, setData] = useState([]);

//   const getdata = async e => {
//     e.preventDefault();
//     try {
//       const url = `http://localhost:8000/option-data?symbol=${symbol}&strikeprice=${strike}&expiryDate=${expiry}`;
//       console.log(url);
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const jsonData = await response.json();
//       console.log(jsonData);
//       setData(jsonData);
//       setSymbol('');
//       setExpiry('');
//       setStrike('');
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       toast.error('Error while fetching data');
//     }
//   };

//   return (
//     <div className="flex justify-center mt-4 ">
//       <form
//         className="flex flex-col space-y-4 border p-4 rounded-[12px] h-60"
//         onSubmit={getdata}
//       >
//         <input
//           value={symbol}
//           onChange={e => setSymbol(e.target.value)}
//           className="border-2 rounded-lg shadow-lg shadow-slate-600 pt-1 pb-1"
//           type="text"
//           placeholder="Enter symbol"
//         />
//         <input
//           value={strike}
//           onChange={e => setStrike(e.target.value)}
//           className="border-2 rounded-lg shadow-slate-600 pt-1 pb-1"
//           type="text"
//           placeholder="Enter strikeprice"
//         />
//         <input
//           value={expiry}
//           onChange={e => setExpiry(e.target.value)}
//           className="border-2 rounded-lg shadow-slate-600 pt-1 pb-1"
//           type="text"
//           placeholder="Enter expiry"
//         />
//         <button
//           className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg"
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>

//       <div>
//         {Array.isArray(setData) ? (
//           setData.map((item, index) => (
//             <div key={index}>
//               {/* Adjust the rendering of setData according to its structure */}
//               <p>{JSON.stringify(item)}</p>
//             </div>
//           ))
//         ) : (
//           <p>{JSON.stringify(setData)}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inputform;
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';
// import Fetchdata from '../Components/fetchData';



const InputForm = ({ setData }) => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [selectedExpiries, setSelectedExpiries] = useState([]);
  const [selectedStrikes, setSelectedStrikes] = useState([]);
  const [strikeOptions, setStrikeOptions] = useState([]);
  const [expiryDate, setExpiryDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSymbols.length > 0) {
        const symbolsArray = selectedSymbols.map(s => s.value);
        const url = `http://localhost:8000/api/option-strikePrice?symbol=${JSON.stringify(symbolsArray)}`;
        console.log(url);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("data"+JSON.stringify(data.flat()));
          const strikeOptions = data.flat().map(item => ({
            value: item.strikePrice,
            label: item.strikePrice
          }));
          const expirydates = data.flat().map(item => ({
            value: item.expiryDate,
            label: item.expiryDate
          }));
          console.log(strikeOptions);
          setStrikeOptions(strikeOptions);
          setExpiryDate(expirydates);
        } catch (error) {
          console.error('Failed to fetch strike prices:', error);
          toast.error('Error while fetching strike prices');
        }
      }
    };
    fetchData();
  }, [selectedSymbols]);

  const symbolOptions = [
    { value: 'NIFTY', label: 'NIFTY' },
    { value: 'BANKNIFTY', label: 'BANKNIFTY' },
    { value: 'FINNIFTY', label: 'FINNIFTY' },
  ];

  

  const getData = async (e) => {
    e.preventDefault();
    try {
      const symbolsArray = selectedSymbols.map(s => s.value);
      const expiriesArray = selectedExpiries.map(e => e.value);
      const strikesArray = selectedStrikes.map(s => s.value);

      const jsonData = await Fetchdata(symbolsArray, strikesArray, expiriesArray);

      console.log(jsonData);
      setData(jsonData);
      setSelectedSymbols([]);
      setSelectedExpiries([]);
      setSelectedStrikes([]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Error while fetching data');
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <form
        className="flex flex-col space-y-4 border p-4 rounded-[12px] h-auto"
        onSubmit={getData}
      >
        <Select
          isMulti
          value={selectedSymbols}
          onChange={setSelectedSymbols}
          options={symbolOptions}
          // className="mb-2"
          placeholder="Select symbols"
        />
        <Select
          isMulti
          value={selectedStrikes}
          onChange={setSelectedStrikes}
          options={strikeOptions}
          className="mb-2"
          placeholder="Select strike prices"
        />
        <Select
          isMulti
          value={selectedExpiries}
          onChange={setSelectedExpiries}
          options={expiryDate}
          // className="mb-2"
          placeholder="Select expiry dates"
        />
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg mt-4 text-white font-bold py-1 px-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;


