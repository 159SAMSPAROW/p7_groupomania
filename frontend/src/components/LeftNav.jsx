import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className="left_nav_container">
      <div className="left_nav_container_icons">
        <div className="left_nav_container_icons_bis">
          <NavLink to="/">
            <img src="./img/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/profil" activeclassname="active-left-nav">
            <img src="./img/user.svg" alt="profile" />
          </NavLink>
          <br />
          <NavLink to="/main" activeclassname="active-left-nav">
            <img src="./img/rocket.svg" alt="main" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default LeftNav
