import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, Iliked, Ifollowed } from '../models/models';
import { jwt, authorization_user_id } from '../models/const-variables';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Article from '../components/Article/Article';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { FormattedMessage } from 'react-intl';

interface Props {
  hashtag:string;
}

const Home: React.FC = () => {
  const hashtag:string = useParams<Props>().hashtag;

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])
  const [articlesResponse, setArticlesResponse] = useState<boolean>(false);

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

      await axios.get(`${API_URL}/articles`, { headers: { hash_name: hashtag } })
      .then(res => {
        setArticles(res.data);
        setArticlesCopy(res.data);
        setArticlesResponse(true);
      })
      .catch( err => console.log(err))
    }
    fetchArticlesData();

  }, [hashtag])

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
          <h2 className='main-header-text'>Hashtag: <span className='text-red-400 font-bold'>{hashtag}</span></h2>
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

export default Home;