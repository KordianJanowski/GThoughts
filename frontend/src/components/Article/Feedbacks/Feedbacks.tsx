import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Ifeedback } from '../../../models/models';
import API_URL from '../../../API_URL'
import AddFeedback from './AddFeedback';
import Feedback from './Feedback'

type Props = {
  articleId: string;
}

const Comments: React.FC<Props> = ({ articleId }) => {
  const[feedbacks, setFeedbacks] = useState<Ifeedback[]>([])
  const[allFeedbacksNumber, setAllFeedbacksNumber] = useState<number>()
  const[page, setPage] = useState<number>(1)

  useEffect(() => {
    const fetchFeedbacks = async () =>{
      await axios.get(`${API_URL}/feedbacks`, { headers: { article_id: articleId, page: page.toString() } })
      .then(res => {
        setFeedbacks(res.data.feedbacks)
        setAllFeedbacksNumber(res.data.allFeedbacksNumber)
      })
      .catch(err => console.log(err))
    }
    fetchFeedbacks();// eslint-disable-next-line
  }, [page])

  const feedbacksMap = feedbacks.map((feedback: Ifeedback) =>{
    return <Feedback feedback={feedback} />
  })

  return (
    <>
      <AddFeedback
        articleId={articleId}
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
      />
      <div className='mt-10'>
        {feedbacksMap}
      </div>
      {
        feedbacks.length < allFeedbacksNumber! ?
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