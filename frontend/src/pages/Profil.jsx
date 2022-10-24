import React from 'react'
import UpdateProfil from '../components/Profil/UpdateProfil'
import LeftNav from '../components/LeftNav'

const Profil = () => {
  return (
    <div id="profile">
      <div>
        <LeftNav />
      </div>

      <div>
        <UpdateProfil />
      </div>
    </div>
  )
}

export default Profil
