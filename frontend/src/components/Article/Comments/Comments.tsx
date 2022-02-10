import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Icomment } from '../../../models/models';
import API_URL from '../../../API_URL'
import AddComment from './AddComment';
import Comment from './Comment'
import { FormattedMessage } from 'react-intl';

type Props = {
  articleId: string;
}

const Comments: React.FC<Props> = ({ articleId }) => {
  const[comments, setComments] = useState<Icomment[]>([])
  const[allCommentsNumber, setAllCommentsNumber] = useState<number>()
  const[page, setPage] = useState<number>(1)

  useEffect(() => {
    const fetchComments = async () =>{
      await axios.get(`${API_URL}/comments`, { headers: { article_id: articleId, page: page.toString() } })
      .then(res => {
        setComments(res.data.comments)
        setAllCommentsNumber(res.data.allCommentsNumber)
      })
      .catch(err => console.log(err))
    }
    fetchComments();// eslint-disable-next-line
  }, [page])

  const commentsMap = comments.map((comment: Icomment) =>{
    return <Comment comment={comment} />
  })

  return (
    <>
      <AddComment
        articleId={articleId}
        comments={comments}
        setComments={setComments}
      />
      <div className='mt-10'>
        {
          commentsMap.length > 0 ?
            commentsMap
          :
            <p><FormattedMessage id='noCommentsFound'/></p>
        }
      </div>
      {
        comments.length < allCommentsNumber! ?
          <button
            className='rounded-button w-40 mb-5'
            onClick={() => setPage(page+1)}
          >
            Więcej
          </button>
        : null
      }
    </>
  )
}

export default Comments