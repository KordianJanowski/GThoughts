import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import API_URL from '../API_URL';
import Article from '../components/Article/Article';
import { jwt, user } from '../models/const-variables';
import { Iarticle, Iuser, Iliked, Ifollowed } from '../models/models';

interface Props {
  id: string;
}

const ProfilesUsers: React.FC = () =>{
  const history: any = useHistory();

  const id: string = useParams<Props>().id;
  const [profileUser, setProfileUser] = useState<Iuser>();
  const [articles, setArticles] = useState<Iarticle[]>([]);

  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(!jwt) return history.push('/login')

    const fetchUser = async () =>{
      fetchFolloweds()
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => setLikeds(res.data))
      .catch(err => console.log(err))

      await axios.get(`${API_URL}/users/${id}`)
      .then(res => {
        setProfileUser(res.data);
        res.data.articles_ids.forEach(async (article_id: string) =>{
          await axios.get(`${API_URL}/articles/${article_id}`)
          .then(response => setArticles((prev: Iarticle[]) => [...prev, response.data]))
          .catch(err => console.log(err));
        })
      })
      .catch(err => console.log(err));
    }
    fetchUser();// eslint-disable-next-line
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
    <div>
      { profileUser ?
        <div>
          {profileUser?.username}
          <img src={profileUser?.avatar} alt="" />
          {articlesMap}
        </div>
      : <div>nie znaleziono takiego uzytkownika</div>}

    </div>
  )
}

export default ProfilesUsers;