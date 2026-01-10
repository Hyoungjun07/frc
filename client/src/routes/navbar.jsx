import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
        <ul className='nav-list'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="Match">Match</Link></li>
            <li><Link to="Strategic">Strategic</Link></li>
            <li><Link to="Pit">Pit</Link></li>
            <li><Link to="Datalookup">Data Lookup</Link></li>
            <li><Link to="Dtf">DTF</Link></li>
        </ul>

    </div>

  )
}
