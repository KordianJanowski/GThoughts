import React, { useState } from 'react'
import axios from 'axios';

import { Icomment } from '../../../models/models';
import {user, authorization} from '../../../models/const-variables';
import API_URL from '../../../API_URL';
import ApproveLayer from '../../ApproveLayer'

type Props = {
  comment: Icomment;
}

const Comments: React.FC<Props> = ({ comment }) =>{

  const[isDeleted, setIsDeleted] = useState(false);

  const[selectedCommentID, setSelectedCommentID] = useState<string | undefined>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);

  const toggleDeleteCommentLayer = (id?: string) =>{
    setSelectedCommentID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteComment = async () =>{
    await axios.delete(`${API_URL}/comments/${selectedCommentID}`, authorization)
    .then(() => {
      setIsDeleted(true)
      setIsDeleteLayerShow(!isDeleteLayerShow);
    })
    .catch(err => console.log(err))
  }

  return(
    <div>
      { isDeleteLayerShow ?
        <ApproveLayer
          id={selectedCommentID}
          toggleLayer={toggleDeleteCommentLayer}
          approve={deleteComment}
        />
      : null}
      { !isDeleted ?
        <div key={ comment.id_ }>
          <img src={ comment.user_avatar } alt="" />
          <div>{ comment.username }</div>
          <div>{ comment.body }</div>
          { user?.id === comment.user_id ?
          <button onClick={() => toggleDeleteCommentLayer(comment.id)}>delete comment</button>
          : null}

        </div>
      : null}
    </div>
  )
}

export default Comments;