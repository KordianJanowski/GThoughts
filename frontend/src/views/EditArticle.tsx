import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import API_URL from '../API_URL'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Iarticle, IarticleBody } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Resizer from 'react-image-file-resizer'
import ArticleBodyCreator from '../components/ArticleBodyCreator'
import Navbar from '../components/Navbar'

interface Props {
  id: string;
}

const EditArticle: React.FC = () => {
  const id: string = useParams<Props>().id;
  const history: any = useHistory();
  const [article, setArticle] = useState<Iarticle>()
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagsAsString, setTagsAsString] = useState<string>('');
  const [body, setBody] = useState<IarticleBody>();
  const [image, setImage] = useState<any>('');
  const [imageLocalURL, setImageLocalURL] = useState<string>()

  useEffect(() => {
    if(!jwt) return history.push('/login')// eslint-disable-next-line

    const fetchArticle = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        if(res.data.author_id !== user.id) return history.push('/')

        setArticle(res.data)
        setTitle(res.data.title)
        setTagsAsString(res.data.hashtags.join(','))
        setBody(res.data.body)
      })
      .catch(err => {
        history.push('/')
      })
    }
    fetchArticle()
  }, [])

  useEffect(() => {
    if(tagsAsString) {
      let tagsString = tagsAsString.replaceAll(/\s/g,'')
      let tags = tagsString.split(',')
      tags = tags.filter(function(str) {
        return /\S/.test(str);
      });
      setTags(tags)
    }
  }, [tagsAsString])

  const editArticle = async () => {
    let imageURL = await postImage()

    if(!imageURL) imageURL = article?.main_image

    const data = {
      title,
      body,
      main_image: imageURL,
      hashtags: tags
    }

    await axios.put(`${API_URL}/articles/${article?.id}`, data, authorization)
    .then(res => history.push(`/articles/${article?.id}`))
    .catch(err => console.log(err))
  }

  const postImage = async () => {
    if(image !== '') {
      const imageResized:any = await resizeFile(image)

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
  }

  return(
    <div className='wrapper'>
      <Navbar />
      <div className="main">
        <div className='main-header'>
          <h2 className='main-header-text'>Edytowanie artykułu</h2>
        </div>
        <div className='main-content'>
          <div className='default-input-box'>
            <label>Tytuł</label>
            <input
              placeholder="title"
              onChange={titleValueChange}
              name="title"
              type="text"
              maxLength={50}
              className="w-full px-3 py-2 text-lg rounded-lg bg-transparent text-gray-300 border border-gray-600"
              value={title}
            />
          </div>
          <div className='default-input-box'>
            <label>Tytuł</label>
            <input
              placeholder="tags"
              onChange={tagsValueChange}
              name="tags"
              type="text"
              maxLength={50}
              className="w-full px-3 py-2 text-lg rounded-lg bg-transparent text-gray-300 border border-gray-600"
              value={tagsAsString}
            />
          </div>
          <div className="default-input-box">
            <label>Zdjęcia</label>
            <div className="min-h-12 w-full md:w-72 text-sm sm:text-base flex flex-col items-start text-white bg-second border border-gray-600 px-3 py-2 rounded-lg">
              <input
                type="file"
                className='mb-2'
                accept="image/png, image/jpeg"
                value=''
                onChange={(e: any) => {
                  setImageLocalURL(URL.createObjectURL(e.currentTarget.files[0]))
                  setImage(e.currentTarget.files[0])
                }}
              />
              <img src={image ? imageLocalURL : article?.main_image} className="w-96" alt="" />
            </div>
          </div>
          {body ?
            <div>
              <ArticleBodyCreator
                setBody={setBody}
                body={body}
              />
            </div>
          : null}
          <button
            onClick={editArticle}
            className="w-8 xl:w-80 h-12 flex flex-row justify-center items-center bg-red-500 text-lg mt-5 py-2 xl:py-4 px-6 xl:px-8 rounded-3xl button-animation"
          >
            Zapisz zmiany
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditArticle;