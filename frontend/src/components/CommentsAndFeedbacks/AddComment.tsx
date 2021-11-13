import React, { useState, useEffect } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import API_URL from '../../API_URL'
import { Icomment } from '../../models/models';
import {user, jwt, authorization} from '../../models/const-variables';
import Comments from './Comments'

type Props = {
  id: string;
}


const AddComment: React.FC<Props> = ({ id }) =>{

  const[comments, setComments] = useState<Icomment[]>([])

  useEffect(() => {
    const fetchComments = async () =>{
      await axios.get(`${API_URL}/comments`, { headers: { article_id: id } })
      .then(res => setComments(res.data))
      .catch(err => console.log(err))
    }
    fetchComments();
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
        const comment: Icomment = {
          body,
          user_id: user.id,
          username: user.username,
          user_avatar: user.avatar,
          article_id: id,
          id_: Math.random()
        }

        await axios.post(`${API_URL}/comments`, comment, authorization)
        .then(res => setComments([...comments, res.data]))
        .catch(err => console.log(err))
      }
      postComment();
    }
  })

  const commentsMap = comments.map((comment: Icomment) =>{
    return <Comments comment={comment} />
  })

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="body" onChange={handleChange} value={values.body}></textarea>
        <input
          className="cursor-pointer w-full h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="add comment"
        />
        {values.body}
      </form>
      { commentsMap }
    </div>
  )
}

export default AddComment;