import Inputform from './Components/Inputform';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className="h-screen bg-zinc-700 font-bold">
      <h1 className="justify-center text-center text-white">Options data</h1>
      <Inputform />
      <Toaster richColors />
    </div>
  );
};

export default App;
