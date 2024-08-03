import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

//Slot machine component
const SlotMachine = () => {
    const [credits, setCredits] = useState(10);
    const [spinning, setSpinning] = useState(false);
    const [results, setResults] = useState(['', '', '']);
    const [message, setMessage] = useState(null);

    const handleSpin = async () => {
      if (credits <= 0 ) return;

      setSpinning(true);
      setResults(['X', 'X', 'X']);
      setCredits(credits - 1);

      try {
        const response = await axios.post('http://localhost:3001/spin', { }, { withCredentials: true });
        const { result, reward } = response.data;

        setTimeout(() => setResults([result[0], 'X', 'X']), 1000);
        setTimeout(() => setResults([result[0], result[1], 'X']), 2000);
        setTimeout(() => {
          setResults(result);
          setCredits((prevCredits) => prevCredits + reward);
          setSpinning(false);
        }, 3000);
      } catch (error) {
        console.error('Error spinning the slot machine:', error);
        setSpinning(false);
      } 
    };

    const handleCashout = async () => {
      if (credits > 0) {
          setMessage(`Successfully cashed out ${credits} credits.`);
          setCredits(0);
      }
    };

    return (
    <div className="slot-machine">
        <div className="reels">
            {results.map((result, index) => (
            <div key={index} className="reel">
                {result}
            </div>
            ))}
        </div>
        <div className="controls">
            <button
            onClick={handleSpin}
            disabled={spinning || credits <= 0}
            className="spin-button"
            >
                {spinning ? 'Spinning...' : 'Spin'}
            </button>
            <button
            onClick={handleCashout}
            disabled={spinning || credits <= 0}
            className="cashout-button"
            >
                Cash Out
            </button>
        </div>
        <div className="credits">
            Credits: {credits}
        </div>
        {message !== null && (
            <div className="message">
            {message}
            </div>
        )}
    </div>
    );
};

export default SlotMachine;
