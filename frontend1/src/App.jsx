import React, { useState } from 'react'
import Inputform from './Components/Inputform'
import FetchData from './Components/fetchData'

const App = () => {
  const [symbol, setSymbol] = useState("")
  const [expiry, setExpiry] = useState("")
  const [strike, setStrike] = useState("")

  const handlesubmit = (symbol, strike, expiry) => {
    console.log(symbol, strike, expiry)
    setSymbol(symbol)
    setExpiry(expiry)
    setStrike(strike)
  }

  return (
    <div className='h-screen bg-zinc-700 font-bold'>
      <h1 className='justify-center text-center text-white'>Options data</h1>
      <Inputform onSubmit={handlesubmit} />
      <FetchData symbol = {symbol} expiry = {expiry} strike = {strike}/>
    </div>
  )
}

export default App
