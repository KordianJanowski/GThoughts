import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../../API_URL';
import { Ifeedback, Iuser } from '../../../models/models';
import { authorization } from '../../../models/const-variables';
import ApproveLayer from '../../ApproveLayer'
import { Link } from 'react-router-dom'

type Props = {
  feedback: Ifeedback;
}

const Feedbacks: React.FC<Props> = ({ feedback }) =>{
  const[isDeleted, setIsDeleted] = useState(false);
  const[selectedFeedbackID, setSelectedFeedbackID] = useState<string | undefined>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  const [author, setAuthor] = useState<Iuser>()

  const toggleDeleteFeedbackLayer = (id?: string) =>{
    setSelectedFeedbackID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteFeedback = async () =>{
    await axios.delete(`${API_URL}/feedbacks/${selectedFeedbackID}`, authorization)
    .then(() => {
      setIsDeleted(true)
      setIsDeleteLayerShow(!isDeleteLayerShow);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(feedback) {
      console.log(feedback)
      axios.get(`${API_URL}/users/${feedback.author_id}`)
      .then(res => {
        console.log(res.data);
        setAuthor(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [feedback])

  return(
    <div>
      {
        isDeleteLayerShow ?
          <ApproveLayer
            id={selectedFeedbackID}
            toggleLayer={toggleDeleteFeedbackLayer}
            approve={deleteFeedback}
          />
        : null
      }
      {
        !isDeleted ?
        <div className="xl:w-1/2">
          <div className="flex flex-row items-center">
            <img src={author?.avatar} alt="" className="rounded-full mr-2 w-10 h-10" />
            <div className='flex flex-col text-gray-300'>
              <Link to={`/profiles-users/${author?.id}`} className='font-semibold'>{ author?.username }</Link>
              <span className='text-xs text-gray-400 -mt-1'>{ feedback.createdAt!.substr(0,10) }</span>
            </div>
          </div>
          <div className="text-gray-100 rounded w-full mt-2 mb-7 bg-transparent resize-none">
            {feedback.body}
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Feedbacks;