import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'

const Navbar = () => {
  const uid = useContext(UidContext)

  return (
    <nav className="nav">
      <div className="nav_container">
        <div className="nav_container_logo">
          <NavLink to="/">
            <div className="nav_container_logo">
              <img src="./img/icon.png" alt="logo" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="nav_container_connected_text">
              <h5>Vous êtes Connecté !🖖</h5>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li className="welcome">
              <NavLink to="/home">
                <img src="./img/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
