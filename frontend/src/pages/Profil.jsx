import React from 'react'
import UpdateProfil from '../components/Profil/UpdateProfil'
import LeftNav from '../components/LeftNav'

const Profil = () => {
  return (
    <div className="profil_page">
      <div className="profil_page_left_nav">
        <LeftNav />
      </div>

      <div>
        <UpdateProfil />
      </div>
    </div>
  )
}

export default Profil
