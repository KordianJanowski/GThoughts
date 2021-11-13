
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';

import API_URL from '../API_URL';

import ApproveLayer from '../components/ApproveLayer'

import { Iuser, IarticleBody, Iarticle } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'



const Dashboard:React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const history: any = useHistory();

  const[selectedArticleID, setSelectedArticleID] = useState<string>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  const[isEditLayerShow, setIsEditLayerShow] = useState<boolean>(false);

  const[articles, setArticles] = useState<Iarticle[]>([])

  useEffect(() =>{
    if(!jwt) history.push('/login')

    // const config = {
    //   headers: {
    //     article_id: '618823a3e7d2ef2fc4fc98b5'
    //   }
    // }

    // axios.get(`${API_URL}/comments`, config)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    const fetchArticles = async () =>{
      await axios.get(`${API_URL}/users/${user.id}`)
      .then(res => {
        if(!res.data.articles_ids) {
          return
        }
        const newArticles: Iarticle[] = []
        res.data.articles_ids.forEach(async (article_id: string, index: number) =>{
          await axios.get(`${API_URL}/articles/${article_id}`)
          .then(async response =>{
            newArticles.push(response.data)
            if(newArticles.length === res.data.articles_ids.length){
              setArticles([...newArticles])
            }
          })
          .catch(err => console.log(err))
        })
      })
    }
    fetchArticles()
  }, [])

  const toggleDeleteArticleLayer = (id:string) =>{
    setSelectedArticleID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteArticle = async () =>{
    await axios.delete(`${API_URL}/articles/${selectedArticleID}`,authorization)
    .then(() => console.log('deleted'))

    await axios.get(`${API_URL}/users/${user.id}`,authorization)
    .then(async res =>{
      const index = res.data.articles_ids.findIndex((article_id: string) => article_id === selectedArticleID);
      const newArticles_ids: string[] = res.data.articles_ids;
      newArticles_ids.splice(index,1)

      await axios.put(`${API_URL}/users/${user.id}`,
      { articles_ids: newArticles_ids }, authorization)
      .then(() =>{
        const index = articles.findIndex((article: Iarticle) => article.id === selectedArticleID);
        const newArticles: Iarticle[] = articles;
        newArticles.splice(index,1)

        setArticles([...newArticles])
        toggleDeleteArticleLayer('')
      })
    })

    .catch(err => console.log(err))
  }

  const toggleEditArticleLayer = (id:string) =>{

  }


  const articlesMap = articles.map((article: Iarticle) =>{
    return (
      <Link to={`/articles/${article.id}`} key={article.id}>
        <div className=' border-2'>
          <h1 className='text-4xl'>
            {article.title}
          </h1>
          { article.body.map((body: IarticleBody) =>{
            return (
              <div key={body.id}>
                <h1 className='text-2xl'>
                  {body.subtitle}
                </h1>
                <p>
                  {body.body}
                </p>
              </div>
            )
          }) }
          <Link to='/dashboard' onClick={() => toggleDeleteArticleLayer(article.id)} className=' text-red-600'>
            delete
          </Link>
          <button className= ' text-blue-600'>
            edit
          </button>
        </div>
      </Link>
    )
  })

  return(
    <div>
      {
        isDeleteLayerShow ?
        <ApproveLayer
          id={selectedArticleID}
          toggleLayer={toggleDeleteArticleLayer}
          approve={deleteArticle}
        />
        : (
          <div>
            {articlesMap}
          </div>
        )
      }

      {user.username}
    </div>
  )
}

export default Dashboard