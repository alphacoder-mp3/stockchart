import Inputform from './Components/Inputform';
import { Toaster } from 'sonner';
import Chart from './Components/chartcomponent'
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  
  return (
    <div className="h-full bg-zinc-700 font-bold">
      <h1 className="justify-center text-center text-white drop-shadow-2xl">Options data</h1>
      <Inputform setData={setData}  />
      <Toaster richColors />
      <Chart/>
    </div>
  );
};

export default App;
