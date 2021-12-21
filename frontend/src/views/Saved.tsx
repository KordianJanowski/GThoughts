import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL';
import axios from 'axios'
import { Iarticle, IarticleBody, Ifollowed, Iliked } from '../models/models';
import { user, jwt } from '../models/const-variables';
import { Link, Route, useHistory } from 'react-router-dom'
import Article from '../components/Article/Article';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenu';

const Saved: React.FC = () =>{
  const history: any = useHistory();

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(!jwt) return history.push('/login')

    const fetchArticlesData = async () =>{
      fetchFolloweds()

      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(async res => {
        setLikeds(res.data);
        await res.data.forEach(async (liked: Iliked) =>{
          await axios.get(`${API_URL}/articles/${liked.article_id}`)
          .then(async articleRes =>  setArticles((prevArticles: Iarticle[]) => [...prevArticles, articleRes.data]))
          .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
    }
    fetchArticlesData();
  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        article={article}
        route='/saved'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
        followeds={followeds}
        fetchFolloweds={fetchFolloweds}
      />
    )
  })

  return(
    <div className='relative flex flex-row container justify-between px-28'>
      <Navbar />
      <div className='min-h-screen flex flex-col items-center px-10 bg-second'>
        <div className='w-full flex justify-between items-center mb-3 mt-2 border-b-2 border-red-400'>
          <h2 className='my-5 text-3xl '>Zapisane</h2>
        </div>
        <div className='flex flex-col'>
          {
            articles.length !== 0 ?
              articlesMap
            :
              <p>Nie znaleziono żadnych artykułów</p>
          }
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default Saved;
