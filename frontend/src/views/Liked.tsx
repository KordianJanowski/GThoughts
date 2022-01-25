import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL';
import axios from 'axios'
import { Iarticle, Ifollowed, Iliked } from '../models/models';
import { jwt, authorization_user_id } from '../models/const-variables';
import { useHistory } from 'react-router-dom'
import Article from '../components/Article/Article';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Loading from '../components/Loading';
import { FormattedMessage } from 'react-intl';

const Saved: React.FC = () =>{
  const history: any = useHistory();

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])
  const [articlesResponse, setArticlesResponse] = useState<boolean>(false);

  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, authorization_user_id)
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(!jwt) return history.push('/login')

    const fetchArticlesData = async () =>{
      fetchFolloweds()

      await axios.get(`${API_URL}/likeds`, authorization_user_id)
      .then(res => setLikeds(res.data))

      await axios.get(`${API_URL}/likeds-articles`, authorization_user_id)
      .then(res =>{
        setArticles(res.data);
        setArticlesCopy(res.data);
        setArticlesResponse(true);
      })
    }
    fetchArticlesData();// eslint-disable-next-line
  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        article={article}
        route='/liked'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
        followeds={followeds}
        fetchFolloweds={fetchFolloweds}
        key={article.id}
      />
    )
  })

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'><FormattedMessage id='liked'/></h2>
        </div>
        <div className='main-content'>
          { articlesResponse ?
            <div>
              {
                articles.length !== 0 ?
                  articlesMap
                :
                  <p><FormattedMessage id='noArticlesFound'/></p>
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

export default Saved;
