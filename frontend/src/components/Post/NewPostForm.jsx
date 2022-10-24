import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from '../../actions/post.actions'
import { isEmpty, timestampParser } from '../Utils'
//import { bio}

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [postPicture, setPostPicture] = useState(null)
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(userData)) {
      setIsLoading(false)
    }
  }, [userData, message])

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const handlePost = async (e) => {
    e.preventDefault()
    if (message || postPicture) {
      const data = new FormData()
      data.append('posterId', userData._id)
      data.append('message', message)
      if (file) data.append('file', file)

      console.log([...data])

      await dispatch(addPost(data))
      dispatch(getPosts())
      cancelPost()
    } else {
      alert('Veuillez entreer un message')
    }
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setFile('')
  }

  return (
    <div className="post_form">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="post_form_data"></div>
          <NavLink exact="true" to="/profil">
            <div>
              <img
                src={userData.picture}
                alt="user-img"
                className="post_form_data_pic"
              />
            </div>
          </NavLink>
          <div className="post_form_bio">{userData.bio}</div>
          <span>{timestampParser(Date.now())}</span>
          <div className="post_form_container">
            <textarea
              type="text"
              name="message"
              id="message"
              placeholder="what's up ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture ? (
              <li className="post_form_container">
                <div>
                  <img
                    src={userData.picture}
                    alt="user-pic"
                    className="post_form_data_pic_prev"
                  />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="email">
                      <h3>{userData.email}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <p>{message}</p>
                  <div>
                    {postPicture && (
                      <img
                        src={postPicture}
                        alt="post-pic"
                        className="post_form_data_post_pic"
                      />
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon ">
                <img
                  className="img-profil"
                  src="./img/picture.svg"
                  alt="add-pic"
                />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </div>

              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    {' '}
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
