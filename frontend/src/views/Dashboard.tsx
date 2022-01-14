import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from '../API_URL';
import { Iarticle } from '../models/models';
import { user, jwt, authorization } from '../models/const-variables';
import Article from '../components/Article/Article';
import ApproveLayer from '../components/ApproveLayer';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import SidemenuDashboard from '../components/Sidemenus/SidemenuDashboard';

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
      await axios.get(`${API_URL}/users/me`, authorization)
      .then(res => {
        console.log(res.data)
        if(res.data.articles_ids.length === 0) return setArticleResponse(true)
        const newArticles: Iarticle[] = []
        res.data.articles_ids.forEach(async (article_id: string) =>{
          await axios.get(`${API_URL}/articles/${article_id}`)
          .then(async response =>{
            newArticles.push(response.data)
            if(newArticles.length === res.data.articles_ids.length){
              setArticles([...newArticles])
              setArticleResponse(true)
            }
          })
          .catch(err => console.log(err))
        })
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
    .then(() => console.log('deleted'))

    await axios.get(`${API_URL}/users/me`, authorization)
    .then(async res =>{
      const index = res.data.articles_ids.findIndex((article_id: string) => article_id === selectedArticleID);
      const newArticles_ids: string[] = res.data.articles_ids;
      newArticles_ids.splice(index,1)

      await axios.put(`${API_URL}/users/me`, { articles_ids: newArticles_ids }, authorization)
      .then(() =>{
        const index = articles.findIndex((article: Iarticle) => article.id === selectedArticleID);
        const newArticles: Iarticle[] = articles;
        newArticles.splice(index,1)

        setArticles(newArticles)
        toggleDeleteArticleLayer('')
      })
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
    <div>
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
                    <h2 className='main-header-text'>Panel użytkownika</h2>
                  </div>
                  <div className='main-content'>

                    { articleResponse ?
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
                <SidemenuDashboard />
            </div>
        :
          null
      }
    </div>
  )
}

export default Dashboard