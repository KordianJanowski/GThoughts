import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle } from '../models/models';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';


const FAQ: React.FC = () => {
  const [article,setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const fetchArticles = async () => {

    await axios.get(`${API_URL}/articles`, { headers: { page: '1' } })
    .then(res => {
      setArticles(res.data.articles);
      setArticlesCopy(res.data.articles);
      console.log(article[0].createdAt)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchArticles()// eslint-disable-next-line
  }, [])
  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='flex flex-col justify-start'>
          <h1 className='mt-20 text-4xl font-bold'>Regulamin:</h1>
          <ol className='ml-8 mt-2'>
            <li className='text-lg font-thin'>Złamanie poniższych punktów skutkuje zablokowaniem.</li>
            <li className='text-lg'>1. Nie używaj wulkaryzmów w komentarzach, feedbackach, artykułach, nazwie użytkownika, zdjęciach.</li>
            <li className='text-lg'>2. Nie wyzywaj innych w komentarzach, feedbackach, artykułach, nazwie użytkownika, zdjęciach.</li>
          </ol>
          <h1 className='mt-10 text-4xl font-bold'>Kontakt</h1>
          <p className='ml-8 mt-2'>
            W razie chęci podjęcia współpracy czy innej potrzeby związanej z aplikacją, zapraszamy do kontaku poprzez drogę mailową do twórców aplikacji: kordianj1227@gmail.com lub stanislawsztrajt@wp.pl
            <br />
            <br />
            W razie zauważenia błędu na stronie golden-arts@op.pl
          </p>
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default FAQ;