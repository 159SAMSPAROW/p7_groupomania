import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost, getPosts } from '../../actions/post.actions'
import { isEmpty, timestampParser } from '../Utils'
import EditDeleteComment from './EditDeleteComment'

const CardComments = ({ post }) => {
  const [text, setText] = useState('')
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(commentPost(post._id, userData._id, text, userData.email))
        .then(() => dispatch(getPosts()))
        .then(() => setText(''))
    }
  }

  return (
    <div className="post_container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? 'card_container_comment'
                : 'card_container_comment'
            }
            key={comment._id}
          >
            <img
              className="card_container_comment_img"
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.picture
                    else return null
                  })
                  .join('')
              }
              alt="commenter-pic"
            />
            <div className="card_container_date">
              <p>{timestampParser(comment.timestamp)}</p>
            </div>
            <div className="card_container_comment_text">
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        )
      })}
      {userData._id && (
        <div className="card_container_comment_footer">
          <textarea
            className="card_container_comment_footer_textarea"
            placeholder="Laisser un commentaire"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <button
            onClick={handleComment}
            type="button"
            className="card_container_comment_footer_textarea_btn"
          >
            Envoyer
          </button>
        </div>
      )}
    </div>
  )
}

export default CardComments
