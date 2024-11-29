import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='header'>
    <div className="header-contents">
        <h2>Zamów tutaj swoje ulubione jedzenie  </h2>
        <p></p>
        <button onClick={()=>navigate('/menu')}>View Menu</button>
    </div>

    </div>
  )
}

export default Header