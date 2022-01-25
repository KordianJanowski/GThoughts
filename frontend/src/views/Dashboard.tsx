import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from '../API_URL';
import { Iarticle } from '../models/models';
import { jwt, authorization } from '../models/const-variables';
import Article from '../components/Article/Article';
import ApproveLayer from '../components/ApproveLayer';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import SidemenuDashboard from '../components/Sidemenus/SidemenuDashboard';
import { FormattedMessage } from 'react-intl';
import { user } from './../models/const-variables';

const Dashboard:React.FC = () =>{
  const history: any = useHistory();

  const[articles, setArticles] = useState<Iarticle[]>([]);
  const[selectedArticleID, setSelectedArticleID] = useState<string>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  // const[isEditLayerShow, setIsEditLayerShow] = useState<boolean>(false);
  const[articleResponse, setArticleResponse] = useState<boolean>(false);

  useEffect(() => {
    if(!jwt) return history.push('/login');

    const fetchArticles = async () =>{
      await axios.get(`${API_URL}/authors-articles/${user.id}`)
      .then(res =>{
        setArticles(res.data);
        setArticleResponse(true);
      })
    }
    fetchArticles()// eslint-disable-next-line
  }, [])

  const toggleDeleteArticleLayer = (id:string) =>{
    setSelectedArticleID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteArticle = async () =>{
    await axios.delete(`${API_URL}/articles/${selectedArticleID}`, authorization)
    .then(() => {
      const index = articles.findIndex((article: Iarticle) => article.id === selectedArticleID);
      const newArticles: Iarticle[] = articles;
      newArticles.splice(index,1)

      setArticles(newArticles)
      toggleDeleteArticleLayer('')
    })
    .catch(err => console.log(err))
  }

  const articlesMap = articles.map((article: Iarticle) =>{
    return (
      <Article
        article={article}
        route='/dashboard'
        toggleDeleteArticleLayer={toggleDeleteArticleLayer}
        likeds={[]}
        followeds={[]}
        fetchFolloweds={() => {}}
        key={article.id}
      />
    )
  })

  return(
    <>
      {
        jwt ?
          isDeleteLayerShow ?
            <ApproveLayer
              id={selectedArticleID}
              toggleLayer={toggleDeleteArticleLayer}
              approve={deleteArticle}
            />
            :
            <div className='wrapper'>
              <Navbar />
              <div className='main'>
                <div className='main-header'>
                  <h2 className='main-header-text'><FormattedMessage id='panel'/></h2>
                </div>
                <div className='main-content'>
                  { articleResponse ?
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
              <SidemenuDashboard />
            </div>
        :
          null
      }
    </>
  )
}

export default Dashboard