import React, { useState, useEffect } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom';

import API_URL from '../../../API_URL'
import { Ifeedback } from '../../../models/models';
import {user, jwt, authorization} from '../../../models/const-variables';

import Feedback from './Feedback';

type Props = {
  id: string;
}


const AddComment: React.FC<Props> = ({ id }) =>{

  const[feedbacks, setFeedbacks] = useState<Ifeedback[]>([])

  useEffect(() => {
    const fetchFeedbacks = async () =>{
      await axios.get(`${API_URL}/feedbacks`, { headers: { article_id: id } })
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log(err))
    }
    fetchFeedbacks();// eslint-disable-next-line
  }, [])

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .max(1000, 'title must be shortet than 50 chars').required(),
    }),
    onSubmit: ({body}) =>{
      const postComment = async () =>{
        const feedback: Ifeedback = {
          body,
          user_id: user.id,
          username: user.username,
          user_avatar: user.avatar,
          article_id: id,
          id_: Math.random()
        }

        await axios.post(`${API_URL}/feedbacks`, feedback, authorization)
        .then(res => setFeedbacks([...feedbacks, res.data]))
        .catch(err => console.log(err))
        values.body = '';
      }
      postComment();
    }
  })

  const feedbacksMap = feedbacks.map((feedback: Ifeedback) =>{
    return <Feedback feedback={feedback} />
  })

  return(
    <div>
      {jwt ?
        <form onSubmit={handleSubmit} className='ml-5'>
          <input
            placeholder='Napisz opinię zwrotną'
            className='w-full py-2 px-4 border rounded-md bg-transparent text-gray-300 border-gray-600 focus:border-red-400 focus:outline-none'
            name="body"
            onChange={handleChange}
            value={values.body}
          />
          <input
            className="cursor-pointer flex p-2 bg-gray-800 text-white"
            type="submit"
            value="add feedback"
          />
          {values.body}
        </form>
      : <h1>aby dodac komentarz, musisz sie <Link to="/login" className=' font-bold'>zalogowac</Link></h1>}

      { feedbacksMap }
    </div>
  )
}

export default AddComment;