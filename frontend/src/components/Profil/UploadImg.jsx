import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPicture } from '../../actions/user.actions'

const UploadImg = () => {
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handlePicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.set('name', userData.email)
    data.set('userId', userData._id)
    data.set('file', file)
    dispatch(uploadPicture(data, userData._id))
  }
  return (
    <form action="" onSubmit={handlePicture} className="footer-form">
      <label htmlFor="file" className="label-file-upload">
        <img className="icon" src="./img/picture.svg" alt="add-pic" />
      </label>
      <input
        type="file"
        id="file"
        className="file-upload"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  )
}

export default UploadImg
