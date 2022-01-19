import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import API_URL from '../../../API_URL'
import { Icomment } from '../../../models/models';
import {user, jwt, authorization} from '../../../models/const-variables';

type Props = {
  id: string;
  comments: Icomment[];
  setComments: React.Dispatch<React.SetStateAction<Icomment[]>>;
}

const AddComment: React.FC<Props> = ({ id, comments, setComments }) =>{
  const [commentBody, setCommentBody] = useState('')

  const postComment = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const comment: Icomment = {
      body: commentBody,
      author_id: user.id,
      article_id: id,
      id_: Math.random()
    }

    await axios.post(`${API_URL}/comments`, comment, authorization)
    .then(res => {
      setCommentBody('')
      setComments([...comments, res.data])
    })
    .catch(err => console.log(err))
  }

  return(
    <div>
      {
        jwt ?
          <form onSubmit={postComment} className="w-full flex flex-col">
            <div className="flex flex-row items-center">
              <img src={user.avatar} alt="" className="rounded-full mr-3 w-10 h-10" />
              <h1 className="font-semibold text-lg">{ user.username }</h1>
            </div>
            <textarea
              rows={2}
              placeholder="Treść komentarza..."
              className="border border-gray-800 text-gray-300 p-2 rounded w-full md:w-4/5 mt-3 mb-2 bg-transparent resize-none"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            <input
              type="submit"
              value="Skomentuj"
              className="rounded-button w-32 md:w-40"
            />
          </form>
        :
        <h1 className='text-lg -mb-4'><Link to="/login" className='font-bold text-red-400'>Zaloguj się</Link>, aby móc dodać komentarz</h1>
      }
    </div>
  )
}

export default AddComment;

