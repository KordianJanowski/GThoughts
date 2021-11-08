import React, { useState, useEffect } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import API_URL from '../../API_URL'

import { Icomment } from '../../models/models';
import {user, jwt} from '../../models/const-variables';

type Props = {
  id: string;
}


const AddComment: React.FC<Props> = ({ id }) =>{

  const[comments, setComments] = useState<Icomment[]>([])

  useEffect(() => {
    const fetchComments = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(async response =>{
        await axios.get(`${API_URL}/comments-and-feedbacks/${response.data.commentsAndFeedbacks_id}`)
        .then(res => setComments([...res.data.comments]))
      })
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
        await axios.get(`${API_URL}/articles/${id}`)
        .then(async response =>{
          console.log(response)
          await axios.get(`${API_URL}/comments-and-feedbacks/${response.data.commentsAndFeedbacks_id}`)
          .then(async res => {
            const newComments: Icomment[] = res.data.comments;
            newComments.push({
              body,
              username: user.username,
              user_avatar: user.avatar,
              id: Math.random()
            })

            await axios.put(`${API_URL}/comments-and-feedbacks/${response.data.commentsAndFeedbacks_id}`,
            { comments: newComments },
            { headers: { Authorization: `Bearer ${jwt}` } })
            .then(res => {
              setComments(res.data.comments)
            })
            .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
      }
      postComment();
    }
  })

  const commentMap = comments.map((comment: Icomment) =>{
    return (
      <div key={ comment.id }>
        <img src={ comment.user_avatar } alt="" />
        <div>{ comment.username }</div>
        <div>{ comment.body }</div>
      </div>
    )
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
      { commentMap }
    </div>
  )
}

export default AddComment;