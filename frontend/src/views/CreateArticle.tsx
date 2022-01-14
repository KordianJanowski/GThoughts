import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { IarticleBody, InewHashtag } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Resizer from 'react-image-file-resizer'
import ArticleBodyCreator from '../components/ArticleBodyCreator'

const CreateArticle: React.FC = () => {
  const history: any = useHistory();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['']);
  const [tagsAsString, setTagsAsString] = useState<string>('');
  const [body, setBody] = useState<IarticleBody>();
  const [image, setImage] = useState<any>('');

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
    <div className='flex flex-col items-start text-2xl text-black'>
      <h1 className='text-white text-4xl mb-5'>Kreator artykułu</h1>
      <input
        placeholder="title"
        onChange={titleValueChange}
        name="title"
        type="text"
        maxLength={50}
        className="mb-2"
        value={title}
      />
      <input
        placeholder="tags"
        onChange={tagsValueChange}
        name="tags"
        type="text"
        maxLength={50}
        className="mb-2"
        value={tagsAsString}
      />
      <input
        type="file"
        className='mb-2'
        accept="image/png, image/jpeg"
        value=''
        onChange={(e: any) => setImage(e.currentTarget.files[0])}
      />
      {image ?
        <img src={URL.createObjectURL(image)}  className="w-96" alt="" />
      : null}
      <ArticleBodyCreator
        setBody={setBody}
      />
      <button
        onClick={postArticle}
        className="cursor-pointer w-60 h-14 mt-5 bg-white text-black rounded-md"
      >
        Stwórz artykuł
      </button>
    </div>
  )
}

export default CreateArticle;