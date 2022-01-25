import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, Iliked, Ifollowed } from '../models/models';
import { jwt, authorization_user_id } from '../models/const-variables';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Article from '../components/Article/Article';
import Loading from '../components/Loading'
import { FormattedMessage } from 'react-intl';


const Home: React.FC = () => {
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])
  const[articleResponse, setArticleResponse] = useState<boolean>(false);
  const[likeds, setLikeds] = useState<Iliked[]>([])
  const[followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds= async () =>{
    await axios.get(`${API_URL}/followeds`, authorization_user_id)
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchArticlesData = async () =>{
      if(jwt){
        await axios.get(`${API_URL}/likeds`, authorization_user_id)
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
          <h2 className='main-header-text'><FormattedMessage id='homepage'/></h2>
        </div>
        <div className='main-content'>
          {
            articleResponse ?
              <div>
                {
                  articles.length !== 0 ?
                    articlesMap
                  :
                    <p><FormattedMessage id='noFollowedFound'/></p>
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