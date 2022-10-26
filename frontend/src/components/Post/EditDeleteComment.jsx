import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../AppContext'

// SRC

import DeleteIcon from '../../img/trash.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, editComment } from '../../actions/post.actions'

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')
  const uid = useContext(UidContext)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText('')
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
  }

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comment.commenterId])

  return (
    <div className="card_container_footer">
      {isAuthor && edit === false && userData.admin === false && (
        <img
          onClick={() => setEdit(!edit)}
          className="card_container_icon"
          src="../../img/edit.svg"
          alt="edit-comment-icon"
        />
      )}
      {userData.admin === true && edit === false && (
        <div className="card_container_icon">
          <img
            onClick={() => setEdit(!edit)}
            className="card_container_icon"
            src="../../img/edit.svg"
            alt="edit-comment-icon"
          />
        </div>
      )}
      {isAuthor && edit && userData.admin === false && (
        <>
          <div className="card_container_message">
            <textarea
              className="card_container_comment_textarea"
              placeholder="Nouveau texte"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            />
          </div>
          <div className="card_container_footer">
            <img
              className="card_container_icon"
              src="../../img/trash.svg"
              alt="trash-icon"
              onClick={() => {
                if (window.confirm('Supprimer le commentaire ?')) {
                  handleDelete()
                }
              }}
            />
            <button
              type="submit"
              className="validation-btn"
              onClick={handleEdit}
            >
              Confirmation
            </button>
          </div>
        </>
      )}
      {userData.admin === true && edit && (
        <>
          <div className="card_container_comment_edit_validation">
            <div >
              <textarea
                className="card_container_comment_edit_textarea"
                placeholder="New text"
                onChange={(e) => setText(e.target.value)}
                defaultValue={comment.text}
              />
            </div>
            <div className='card_container_comment_edit_footer'>
              <img
                className="card_container_comment_edit_trash"
                src={DeleteIcon}
                alt="trash-icon"
                onClick={() => {
                  if (window.confirm('Supprimer le commentaire ?')) {
                    handleDelete()
                  }
                }}
              />
              <button
                className="card_container_comment_edit_btn"
                type="submit"
                onClick={handleEdit}
              >
                {' '}
                Valider
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EditDeleteComment
