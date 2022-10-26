import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className="left_nav_container">
      <div className="left_nav_container_icons">       
          <br />
          <NavLink to="/profil">
            <img src="./img/user.svg" alt="profile" className='left_nav_container_img'/>
          </NavLink>
          <br />
          <NavLink to="/main">
            <img src="./img/rocket.svg" alt="main" className='left_nav_container_img'/>
          </NavLink>
        </div>
    </div>
  )
}
export default LeftNav
