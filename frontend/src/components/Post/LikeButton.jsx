import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../AppContext'
import { useDispatch } from 'react-redux'

// SRC

import EmptyHeartImg from '../../img/heart.svg'
import FilledHeartImg from '../../img/heart-filled.svg'
import { likePost, unlikePost } from '../../actions/post.actions'

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    console.log(post)
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [uid, post.likers, liked])

  return (
    <div className="card_container_icon">
      {uid && liked === false && (
        
        <img src={EmptyHeartImg} onClick={like} alt="like-icon" className='heart_like'/>
      )}
      {uid && liked && (
        <img src={FilledHeartImg} onClick={unlike} alt="unlike-icon" className='heart_like'/>
      )}
      <p>{post.likers.length}</p>
    </div>
  )
}

export default LikeButton
