import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Cookies from 'universal-cookie';
import { Link, useHistory } from "react-router-dom";

import API_URL from '../API_URL'

import { Iuser, IarticleBody } from '../models/models'
import {user, jwt} from '../models/const-variables'

const CreateArticle: React.FC = () =>{
  const history: any = useHistory();
  const cookies: Cookies = new Cookies();

  const [articleBodies, setArticleBodies] = useState<IarticleBody[]>([]);

  useEffect(() => { if(!jwt) history.push('/login') }, [])

  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      body: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(4, 'Password should be longer tan 4 characters').required()
        .max(50, 'title must be shortet than 50 chars').required(),
    }),
    onSubmit: ({title}) =>{
      const postArticle = async () =>{
        await axios.post(`${API_URL}/comments-and-feedbacks`,
        {
          comments: [],
          feedbacks: [],
        },
        { headers: { Authorization: `Bearer ${jwt}` } })
        .then(async res => {
          const article = {
            title,
            body: articleBodies,
            author_id: user.id,
            author_name: user.username,
            main_image: '',
            commentsAndFeedbacks_id: res.data.id
          }

          await axios.post(`${API_URL}/articles`,
          article,
          { headers: { Authorization: `Bearer ${jwt}` } })
          .then(async articleResponse => {
            await axios.get(`${API_URL}/users/${user.id}`,
            { headers: { Authorization: `Bearer ${jwt}` } })
            .then(async res =>{
              const newArticles: string[] = res.data.articles_ids;
              newArticles.push(articleResponse.data.id)

              await axios.put(`${API_URL}/users/${user.id}`,
              { articles_ids: newArticles },
              { headers: { Authorization: `Bearer ${jwt}` } })
              .then(() => history.push('/dashboard'))
              .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
          })
        .catch(err => console.log(err))


      }
      postArticle()
    }
  })

  const addArticleBody = () =>{
    const newArticleBody = {
      subtitle: values.subtitle,
      body: values.body,
      id: Math.random()
    }
    setArticleBodies([...articleBodies, newArticleBody])
    values.subtitle = '';
    values.body = '';
  }

  const deleteArticleBody = (id: number) =>{
    const index: number = articleBodies.findIndex(articleBody => articleBody.id === id);
    const newArticleBodies: IarticleBody[] = articleBodies;
    newArticleBodies.splice(index,1)

    setArticleBodies([...newArticleBodies])
  }

  const articleBodiesMap = articleBodies.map(articleBody =>{
    return(
      <div key={articleBody.id}>
        <h1>{articleBody.subtitle}</h1>
        <p>{articleBody.body}</p>
        <button onClick={() => deleteArticleBody(articleBody.id)}>delete party X</button>
      </div>
    )
  })

  return(
    <div>
      <h1>Create article</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
          onChange={handleChange}
          onBlur={handleBlur}
          name="title"
          type="text"
          maxLength={50}
          className=""
          value={values.title}
        />
        <div>
          <input
            placeholder="subtitle"
            name="subtitle"
            maxLength={50}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subtitle}
          />
          <textarea
            placeholder="body"
            name="body"
            className='text-black'
            maxLength={1500}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
          ></textarea>
        </div>
        <input
          className="cursor-pointer w-full h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="create article"
        />
      </form>
      <button className="w-96 h-96 bg-white text-black" onClick={addArticleBody}>add new part</button>
      { articleBodiesMap }
    </div>
  )
}

export default CreateArticle;