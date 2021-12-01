
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';

import API_URL from '../API_URL';

import ApproveLayer from '../components/ApproveLayer'

import { Iuser, IarticleBody, Iarticle } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Article from '../components/Article';



const Dashboard:React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const history: any = useHistory();

  const[selectedArticleID, setSelectedArticleID] = useState<string>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  const[isEditLayerShow, setIsEditLayerShow] = useState<boolean>(false);

  const[articles, setArticles] = useState<Iarticle[]>([])

  useEffect(() =>{
    if(!jwt) return history.push('/login')

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

    await axios.get(`${API_URL}/users/${user.id}`)
    .then(async res =>{
      const index = res.data.articles_ids.findIndex((article_id: string) => article_id === selectedArticleID);
      const newArticles_ids: string[] = res.data.articles_ids;
      newArticles_ids.splice(index,1)

      await axios.put(`${API_URL}/users/${user.id}`, { articles_ids: newArticles_ids }, authorization)
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
      <Article
        article={article}
        route='/dashboard'
        toggleDeleteArticleLayer={toggleDeleteArticleLayer}
        likeds={[]}
      />
    )
  })

  return(
    <div className='absolute top-0 left-1/2 min-h-full flex flex-col items-center px-10 bg-second transform -translate-x-1/4'>
      { isDeleteLayerShow ?
        <ApproveLayer
          id={selectedArticleID}
          toggleLayer={toggleDeleteArticleLayer}
          approve={deleteArticle}
        />
        :
        <div>
          {articlesMap}
        </div>
      }

      {user?.username}
      {user?.id}
    </div>
  )
}

export default Dashboard