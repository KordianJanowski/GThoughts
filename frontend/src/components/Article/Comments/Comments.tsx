import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Icomment } from '../../../models/models';
import API_URL from '../../../API_URL'
import AddComment from '../Comments/AddComment';
import Comment from './Comment'
import { FormattedMessage } from 'react-intl';

type Props = {
  id: string;
}

const Comments: React.FC<Props> = ({ id }) => {
  const[comments, setComments] = useState<Icomment[]>([])

  useEffect(() => {
    const fetchComments = async () =>{
      await axios.get(`${API_URL}/comments`, { headers: { article_id: id } })
      .then(res => setComments(res.data))
      .catch(err => console.log(err))
    }
    fetchComments();// eslint-disable-next-line
  }, [])

  const commentsMap = comments.map((comment: Icomment) =>{
    return <Comment comment={comment} />
  })

  return (
    <div className='main-content'>
      <h1 className="text-3xl pb-3"><FormattedMessage id='comments'/></h1>
      <div className='border-t border-gray-800 py-7 mb-5'>
        <AddComment
          id={id}
          comments={comments}
          setComments={setComments}
        />
      </div>
      {commentsMap}
    </div>
  )
}

export default Comments