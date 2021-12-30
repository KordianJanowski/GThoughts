import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import API_URL from '../API_URL';
import Article from '../components/Article/Article';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import SidemenuProfilesUsers from '../components/Sidemenus/SidemenuProfilesUsers';
import SidemenuProfilesUsersLoading from '../components/Sidemenus/SidemenuProfilesUsersLoading';
import { jwt, user } from '../models/const-variables';
import { Iarticle, Iuser, Iliked, Ifollowed } from '../models/models';


interface Props {
  id: string;
}

const ProfilesUsers: React.FC = () =>{
  const id: string = useParams<Props>().id;
  const [profileUser, setProfileUser] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: ''});
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [articles, setArticles] = useState<Iarticle[]>([]);

  const[articleResponse, setArticleResponse] = useState<boolean>(false);

  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  const fetchLikeds = async () =>{
    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setLikeds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchUserData = async () =>{
      if(jwt){
        fetchFolloweds();
        fetchLikeds();
      }

      await axios.get(`${API_URL}/users/${id}`)
      .then(res => {
        setProfileUser(res.data);
        setIsUserLoaded(true);
        res.data.articles_ids.forEach(async (article_id: string) =>{
          await axios.get(`${API_URL}/articles/${article_id}`)
          .then(response => {
            setArticles((prev: Iarticle[]) => [...prev, response.data]);
            setArticleResponse(true);
          })
          .catch(err => console.log(err));
        })
      })
      .catch(err => console.log(err));
    }
    fetchUserData();// eslint-disable-next-line
  }, [])

  const articlesMap = articles.map((article: Iarticle) =>{
    return (
      <Article
        article={article}
        route={`/profiles-users/${id}`}
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
          <h2 className='main-header-text'>Profil użytkownika <span className='text-red-400 font-bold'>{profileUser.username}</span></h2>
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
      { isUserLoaded ?
        <SidemenuProfilesUsers user={profileUser!} />
      :
        <SidemenuProfilesUsersLoading />
      }
    </div>
  )
}

export default ProfilesUsers;