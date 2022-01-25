import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { IarticleBody, InewHashtag } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Resizer from 'react-image-file-resizer'
import ArticleBodyCreator from '../components/ArticleBodyCreator'
import Navbar from '../components/Navbar'
import { FormattedMessage } from 'react-intl';
import { LOCALES } from './../i18n/locales';

const CreateArticle: React.FC = () => {
  const history: any = useHistory();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['']);
  const [tagsAsString, setTagsAsString] = useState<string>('');
  const [body, setBody] = useState<IarticleBody>();
  const [image, setImage] = useState<any>('');
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  useEffect(() => {
    if(!jwt) return history.push('/login')// eslint-disable-next-line
  }, [])

  const postArticle = async () => {
    let imageURL = await postImage()

    const article = {
      title,
      body,
      main_image: imageURL,
      author_id: user.id,
      author_name: user.username,
      hashtags: tags,
    }

    await axios.post(`${API_URL}/articles`, article, authorization)
    .then( async articleResponse => {
      await axios.get(`${API_URL}/users/me`, authorization)
      .then(async res =>{
        const newArticles: string[] = res.data.articles_ids;
        newArticles.push(articleResponse.data.id)

        await axios.put(`${API_URL}/users/me`, { articles_ids: newArticles }, authorization)
        .then(() => history.push('/dashboard'))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    postHashtags()
  }

  const postHashtags = async () => {
    tags.forEach(async tag => {
      const newHashtag:InewHashtag = {
        name: tag
      }
      await axios.post(`${API_URL}/hashtags`, newHashtag, authorization)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  const postImage = async () => {
    if(image !== '') {
      const imageResized: any = await resizeFile(image)

      const data = new FormData()
      data.append('file', imageResized)
      data.append("api_key", '732376169492789');
      data.append("api_secret", 'A-dhHrnEZqJYnhAGqLAGcWSDI1M');
      data.append("cloud_name", 'digj3w8rk');
      data.append("upload_preset", "bb7forio");

      const res = await axios.post(`https://api.cloudinary.com/v1_1/digj3w8rk/image/upload`, data)
      return res.data.secure_url
    }
  }

  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 600, 600, 'JPEG', 100, 0,
    (uri) => {
      resolve(uri);
    }, 'base64' );
  });

  const titleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const tagsValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagsAsString(event.target.value)

    let tagsAsString = event.target.value.replaceAll(/\s/g,'')
    let tags = tagsAsString.split(',')
    tags = tags.filter(function(str) {
      return /\S/.test(str);
    });

    setTags(tags)
  }

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'><FormattedMessage id='creatorArticle'/></h2>
        </div>
        <div className='main-content'>
          <div className='default-input-box'>
            <label><FormattedMessage id='title'/></label>
            <input
              type="text"
              value={title}
              onChange={titleValueChange}
              placeholder={`${isI18NisEnglish ? 'Example. Why programming is good for our brains ?' : 'Np. Dlaczego programowanie jest korzystne dla naszego mózgu ?'}`}
              className="w-full px-3 py-2 text-lg rounded-lg bg-transparent text-gray-300 border border-gray-600"
            />
          </div>
          <div className='default-input-box'>
            <label><FormattedMessage id='hashtag'/></label>
            <input
              type="text"
              value={tagsAsString}
              onChange={tagsValueChange}
              placeholder={`${isI18NisEnglish ? 'Programing, Brain' : 'Programowanie, Mózg'}`}
              className="w-full px-3 py-2 text-lg rounded-lg bg-transparent text-gray-300 border border-gray-600"
            />
          </div>
          <div className="default-input-box">
            <label><FormattedMessage id='mainImage'/></label>
            <div className="min-h-12 w-full md:w-72 text-sm sm:text-base flex flex-col items-start text-white bg-second border border-gray-600 px-3 py-2 rounded-lg">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e: any) => setImage(e.currentTarget.files[0])}
                className={image ? 'mb-2' : ''}
              />
              {image ?
                <img src={URL.createObjectURL(image)}  className="w-96" alt="" />
              : null}
            </div>
          </div>
          <ArticleBodyCreator
            setBody={setBody}
          />
          <button
            onClick={postArticle}
            className="w-8 xl:w-80 h-12 flex flex-row justify-center items-center bg-red-500 text-lg mt-5 py-2 xl:py-4 px-6 xl:px-8 rounded-3xl button-animation"
          >
            <FormattedMessage id='createArticle'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle;