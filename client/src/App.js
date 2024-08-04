import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//Slot machine component
const SlotMachine = () => {
    const [credits, setCredits] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [results, setResults] = useState(['', '', '']);
    const [message, setMessage] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    // Start new session when Slot machine component rendered 
    useEffect(() => {
      const initializeSession = async () => {
        try {
          // Store the account ID in a cookie to bypass registration and login processes
          let accountId = Cookies.get('accountId');
              
          if (!accountId) {
              accountId = uuidv4();
              Cookies.set('accountId', accountId); 
          }

          //Start new game session on server
          const response = await axios.post('http://localhost:3001/start-session', { accountId }, { withCredentials: true });
          const { initialCredits, sessionId } = response.data;
          setCredits(initialCredits);
          setSessionId(sessionId);
        } catch (error) {
          console.error('Error initializing session:', error);
        }
      };

      initializeSession();
    }, []);

    const handleSpin = async () => {
      if (credits <= 0 || !sessionId) return;

      setSpinning(true);
      setResults(['X', 'X', 'X']);
      setCredits(credits - 1);

      try {
        const response = await axios.post('http://localhost:3001/spin', { sessionId }, { withCredentials: true });
        const { result, credits } = response.data;

        setTimeout(() => setResults([result[0], 'X', 'X']), 1000);
        setTimeout(() => setResults([result[0], result[1], 'X']), 2000);
        setTimeout(() => {
          setResults(result);
          setCredits(credits);
          setSpinning(false);
        }, 3000);
      } catch (error) {
        console.error('Error spinning the slot machine:', error);
        setSpinning(false);
      } 
    };

    const handleCashout = async () => {
      if (credits > 0 && sessionId) {
        try {
          const response = await axios.post('http://localhost:3001/cashout', { sessionId }, { withCredentials: true });
          const { cashoutCredits, accountCredits } = response.data;
          setMessage(`Successfully cashed out ${cashoutCredits} credits.\nYour total account credits: ${accountCredits}`);
          setCredits(0);
        } catch (error) {
          console.error('Error cashing out:', error);
        }
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
