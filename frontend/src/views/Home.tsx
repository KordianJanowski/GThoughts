import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, Iliked, Ifollowed } from '../models/models';
import { user, jwt } from '../models/const-variables';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Article from '../components/Article/Article';
import Loading from '../components/Loading'

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])
  const[articleResponse, setArticleResponse] = useState<boolean>(false);
  const[likeds, setLikeds] = useState<Iliked[]>([])
  const[followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds= async () =>{
    await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchArticlesData = async () =>{
      if(jwt){
        await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
        .then(res => setLikeds(res.data))
        .catch(err => console.log(err))

        fetchFolloweds()
      }

      await axios.get(`${API_URL}/articles`)
      .then(res => {
        setArticles(res.data)
        setArticlesCopy(res.data)
        setArticleResponse(true)
      })
      .catch( err => console.log(err))
    }
    fetchArticlesData();

  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        key={article.id}
        article={article}
        route='/'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
        followeds={followeds}
        fetchFolloweds={fetchFolloweds}
      />
    )
  })

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'>Główna</h2>
        </div>
        <div className='main-content'>
          {
            articleResponse ?
              <div>
                {
                  articles.length !== 0 ?
                    articlesMap
                  :
                    <p>Nie znaleziono żadnych artykułów</p>
                }
              </div>
            :
              <Loading />
          }
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default Home;