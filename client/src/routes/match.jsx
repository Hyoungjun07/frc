import React from 'react'
import '../styles/form.css';
import { useState, useEffect } from 'react';
import {QRCode, Button, Divider } from 'antd';
 
export default function Match() {

  const [team_number, setTeamNumber] = useState(0);

  const [matchData, setMatchData] = useState({
    team: 0,
    scout_initials: "",
    match_level: "a",
    match_number: "",
    climb_successful: false,
    robot_position: "a"
  });

  useEffect(() => {
    setMatchData(prev => ({
      ...prev,
      team: team_number
    }));
  }, [team_number]);

  async function request(query) {
	const response = await fetch('https://www.thebluealliance.com/api/v3/' + query, {
		method: "GET",
		headers: {
			'X-TBA-Auth-Key': atob("c3NsVlhkQ3NUWnBwTXFoZUJkN01NVlN4RHJJZFV1ZjFreUk0SEZwUjJSenNZaWJkSGhGUHZMeUtsdEtyNVhIeg=="),
		}
	});

	if(response.ok) {
		return response;
	}
	throw new Error(`Could not fetch`);
}

  async function getTeamsInMatch(eventKey, compLevel, matchNumber, robpos) {
    const response = await request('match/' + `${eventKey}_${compLevel}${matchNumber}`);
    // console.log(`${eventKey}_${compLevel}${matchNumber}`)
    // console.log(response)
    const match = await response.json()
    // console.log(match)
    const red  = match.alliances.red.team_keys.map(x => Number(x.slice(3)));
    const blue = match.alliances.blue.team_keys.map(x => Number(x.slice(3)));
    const result = [...red, ...blue]

    if (robpos[0] == "R") {
      if (robpos[1] == "1") {
        return result[0]
      }
      else if (robpos[1] == "2") {
        return result[1]
      }
      else {
        return result[2]
      }
    }
    else {
      if (robpos[1] == "1") {
        return result[3]
      }
      else if (robpos[1] == "2") {
        return result[4]
      }
      else {
        return result[5]
      }
    }

  }

  function handleChange(event){
    const {name, value, type, checked} = event.target;
 
    setMatchData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const [showQR, setShowQR] = useState(false);

  async function handleSubmit(event) {
      event.preventDefault();
      setTeamNumber(await getTeamsInMatch("2025cass", "qm", matchData.match_number, matchData.robot_position))
      setShowQR(true);  // show QR after submit
  }

   // Specify the order of values
  const qrValue = [
    matchData.team,
    matchData.scouter_initials,
    matchData.match_level,
    matchData.match_number,
    matchData.climb_successful ? 1 : 0,
    matchData.robot_position
  ].join('\t');
 
  return (
    <div className="form-container">
      {/* Call the handleSubmit function upon clicking on the Submit button. */}
      <form className="form-card" onSubmit={handleSubmit}>  
 
        <div className="form-group">
          <label htmlFor="team">Team</label>
          <input
            id="team"
            name="team"
            type="text"
            value={matchData.team}
            onChange={handleChange}
            disabled
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
         
          <select
            id="match_level"
            name="match_level"
                       
            value={matchData.match_level}
            onChange={handleChange}
            required
            >
              <option value="a" disabled="" hidden=""></option>
              <option value="Qualification">Qualification</option>
              <option value="Playoffs">Playoffs</option>
              <option value="Finals">Finals</option>
 
            </select>
        </div>
 
       <div className="form-group">
          <label htmlFor="match_number">Match number</label>
          <input
            id="match_number"
            name="match_number"
            type="number"
            min = {1}
            max = {5}
            value={matchData.match_number}
            onChange={handleChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="robot_position">Robot position</label>
         
          <select
            id="robot_position"
            name="robot_position"
                       
            value={matchData.robot_position}
            onChange={handleChange}
            required
            >
              <option value="a" disabled="a" hidden=""></option>
              <option value="R1">R1</option>
              <option value="R2">R2</option>
              <option value="R3">R3</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="B3">B3</option>
 
            </select>
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