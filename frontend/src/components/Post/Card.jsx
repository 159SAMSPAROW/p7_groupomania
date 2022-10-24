import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'

import LikeButton from './LikeButton'

// SRC
import { updatePost } from '../../actions/post.actions'
import DeleteCard from './DeleteCard'
import CardComments from './CardComments'

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [usersData])

  return (
    <div className="card_container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div>
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture
                    else return null
                  })
                  .join('')
              }
              alt="user-pic"
              className="card_container_left_post_img"
            />
          </div>
          <div className="card_container_post">
            <div className="card_container_header">
              <span>
                {!isEmpty(usersData[0]) &&
                  usersData.map((user) => {
                    if (user._id === post.posterId) return user.email
                    else {
                      return null
                    }
                  })}
              </span>
            <div className='card_container_date'>
              <p>{dateParser(post.createdAt)}</p>
              </div>
            </div>
            <br />
            
              <div className="card_container_message">
                {isUpdated === false && <p>{post.message}</p>}
              </div>

              {isUpdated && (
                <div className="update-post">
                  <textarea
                    id="update-message"
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="update-btn-container">
                    <button className="validation-btn" onClick={updateItem}>
                      Valider
                    </button>
                  </div>
                </div>
              )}
              {post.picture && (
                <img
                  src={post.picture}
                  alt="card-pic"
                  className="card_container_img_post"
                />
              )}
              <div className="card_container_footer">
                {userData._id === post.posterId && userData.admin === false && (                  
                    <div className='card_container_icon'>
                    <img
                      src="../../img/edit.svg"
                      alt="icon-edit"
                      onClick={() => setIsUpdated(!isUpdated)}
                    />
                    <DeleteCard id={post._id} />
                  </div>
                )}
                {userData.admin === true && (
                  <div className="card_container_icon">
                    <img
                      src="../../img/edit.svg"
                      alt="icon-edit"
                      onClick={() => setIsUpdated(!isUpdated)}
                    />
                    <DeleteCard id={post._id} />
                </div>
                )}              
                  <br />
                  <div className='card_container_icon'>      
                  <img
                    src="../../img/message1.svg"
                    alt="edit icon"
                    onClick={() => setShowComments(!showComments)}
                  />
                  <p>{post.comments.length}</p> 
                  </div>
                <LikeButton post={post} /> 
              {showComments && <CardComments post={post} />}
              </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
