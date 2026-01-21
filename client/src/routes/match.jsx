import React from 'react'
import '../styles/form.css';
import { useState } from 'react';
import {QRCode, Button, Divider } from 'antd';

export default function Match() {
  const [matchData, setMatchData] = useState ({
    match_event: "",
    scouter_initials: "",
    match_level: "",
    climb_successful: false
  });

  function handleChange(event){
    const {name, value, type, checked} = event.target;

    setMatchData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const [showQR, setShowQR] = useState(false);

  function handleSubmit(event) {
      event.preventDefault();
      setShowQR(true);  // show QR after submit
      console.log(matchData);
  }
  
   // Specify the order of values
  const qrValue = [
    matchData.match_event,
    matchData.scouter_initials,
    matchData.match_level,
    matchData.climb_successful ? 1 : 0
  ].join('\t');

  return (
    <div className="form-container">
      {/* Call the handleSubmit function upon clicking on the Submit button. */}
      <form className="form-card" onSubmit={handleSubmit}>  

        <div className="form-group">
          <label htmlFor="match-event">Match Event</label>
          <input 
            id="match_event" 
            name="match_event" 
            type="text" 
            value={matchData.match_event}
            onChange={handleChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="scouter_initials">Scouter Initials</label>
          <input 
            id="scouter_initials" 
            name="scouter_initials" 
            type="text" 
            minLength={2}
            maxLength={3}
            value={matchData.scouter_initials} 
            onChange={handleChange} 
            required />
        </div>

       <div className="form-group">
          <label htmlFor="match_level">Match Level</label>
          <input 
            id="match_level" 
            name="match_level" 
            type="number" 
            min = {1}
            max = {5}
            value={matchData.match_level} 
            onChange={handleChange} 
            required />
        </div>

       <div className="form-group">
          <label htmlFor="climb_successful">Climb Successful?</label>
          <input 
            id="climb_successful" 
            name="climb_successful" 
            type="checkbox" 
            checked={matchData.climb_successful} 
            onChange={handleChange}  />
        </div>

        <button type="submit" className="submit-button">Submit</button>

        {showQR && (
          <>
            <Divider>Scan Match Data</Divider>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <QRCode
                // value={JSON.stringify(matchData)}
                value={qrValue}
                size={200}
                bordered
                />
            </div>
          </>
        )}

      </form>
    </div>

  )
}