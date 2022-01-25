import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Icomment, Iuser } from '../../../models/models';
import { authorization } from '../../../models/const-variables';
import API_URL from '../../../API_URL';
import ApproveLayer from '../../ApproveLayer'
import { Link } from 'react-router-dom'

type Props = {
  comment: Icomment;
}

const Comments: React.FC<Props> = ({ comment }) =>{
  const[isDeleted, setIsDeleted] = useState(false);
  const[selectedCommentID, setSelectedCommentID] = useState<string | undefined>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  const [author, setAuthor] = useState<Iuser>()

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

  useEffect(() => {
    if(comment) {
      console.log(comment)

      axios.get(`${API_URL}/users/${comment.author_id}`)
      .then(res => setAuthor(res.data))
      .catch(err => console.log(err))
    }
  }, [comment])

  return(
    <div>
      {
        isDeleteLayerShow ?
          <ApproveLayer
            id={selectedCommentID}
            toggleLayer={toggleDeleteCommentLayer}
            approve={deleteComment}
          />
        : null
      }
      {
        !isDeleted ?
        <div className="xl:w-1/2 rounded">
          <div className="flex flex-row items-center">
            <img src={author?.avatar} alt="" className="rounded-full mr-2 w-10 h-10" />
            <div className='flex flex-col text-gray-300'>
              <Link to={`/profiles-users/${author?.id}`} className='font-semibold'>{ author?.username }</Link>
              <span className='text-xs text-gray-400 -mt-1'>{ comment.createdAt!.substr(0,10) }</span>
            </div>
          </div>
          <div className="text-gray-100 rounded w-full mt-2 mb-10 bg-transparent resize-none">
            {comment.body}
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Comments;