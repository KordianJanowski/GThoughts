import React, { useState, useEffect } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import API_URL from '../../API_URL'
import { Ifeedback } from '../../models/models';
import {user, jwt, authorization} from '../../models/const-variables';

import Feedbacks from './Feedbacks';

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
    fetchFeedbacks();
  }, [])

  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
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
    return <Feedbacks feedback={feedback} />
  })

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="body" onChange={handleChange} value={values.body}></textarea>
        <input
          className="cursor-pointer flex p-2 bg-gray-800 text-white"
          type="submit"
          value="add feedback"
        />
        {values.body}
      </form>
      { feedbacksMap }
    </div>
  )
}

export default AddComment;