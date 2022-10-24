import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {


 const dispatch = useDispatch();   

 const deleteQuote = () => {
    dispatch(deletePost(props.id))
 };

  return (
    <div className='card_container_icon' onClick={() => {
        if (window.confirm('Supprimez votre post ?')){
            deleteQuote();
        }
    }}>
        <img src="../../img/trash.svg" alt='icon' className='delete-icon'/>
    </div>
  )
}

export default DeleteCard