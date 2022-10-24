import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBio } from '../../actions/user.actions'

import { isEmpty, timestampParser } from '../Utils'
import UploadImg from './UploadImg'

const UpdateProfil = () => {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)

  const errors = useSelector((state) => state.userErrors)
  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  return (
    <div className="profil_page">
      <div className="profil_page_user_name">
        <h1>Profil de {userData.email}</h1>
      </div>

      <div className="profil_page_container">
        <div className="profil_page_container_user">
          <h2>Ma photo de profil</h2>
          <img src={userData.picture} alt="profil-pic" />
          <UploadImg />
          {!isEmpty(errors)}
          {!isEmpty && <p className="errors">{errors.maxSize}</p>}
        </div>

        <div className="profil_page_container_bio">
          <h2>Biographie</h2>
          <div className="profil_page_container_bio_text">
            {updateForm === false && (
              <>
                <div className="profil_page_container_bio_text">
                  <p onClick={() => setUpdateForm(!updateForm) } >
                    {userData.bio}
                    
                  </p>
                </div>
                <div className="profil_page_container_bio_btn">
                  <input
                    type="submit"
                    value="Modifier"
                    className="btn-send"
                    onClick={() => setUpdateForm(!updateForm)}
                  />
                </div>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  className="profil_page_container_bio_text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <div>
                  <input
                    type="submit"
                    value="Valider"
                    className="profil_page_container_bio_btn"
                    onClick={handleUpdate}
                  />
                </div>
              </>
            )}
          </div>
          <div className="profil_page_container_bio_date">
            <p>
              Membre depuis le :<br />
              {timestampParser(userData.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfil
