import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { InewHashtag } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Resizer from 'react-image-file-resizer'
import ArticleBodyCreator from '../components/ArticleBodyCreator'

const CreateArticle: React.FC = () => {
  const history: any = useHistory();
  const [step, setStep] = useState<number>(1);
  
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['']);
  const [tagsAsString, setTagsAsString] = useState<string>('');
  const [body, setBody] = useState<object[]>([]);
  const [image, setImage] = useState<any>('');
  const [imageURL, setImageURL] = useState<string>('')

  useEffect(() => { 
    if(!jwt) return history.push('/login') 
  }, [])

  useEffect(() => {
    createImageURL()
  }, [image])

  const postArticle = async () => {
    const article = {
      title,
      body,
      main_image: imageURL,
      author_id: user.id,
      author_name: user.username,
      hashtags: tags,
    }

    console.log(article)
    await axios.post(`${API_URL}/articles`, article, authorization)
    .then( async articleResponse => {
      await axios.get(`${API_URL}/users/${user.id}`)
      .then(async res =>{
        const newArticles: string[] = res.data.articles_ids;
        newArticles.push(articleResponse.data.id)

        await axios.put(`${API_URL}/users/${user.id}`, { articles_ids: newArticles }, authorization)
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

  const createImageURL = async () => {
    if(image !== '') {
      const imageResized: any = await resizeFile(image)
  
      const data = new FormData()
      data.append('file', imageResized)
      data.append("api_key", '732376169492789');
      data.append("api_secret", 'A-dhHrnEZqJYnhAGqLAGcWSDI1M');
      data.append("cloud_name", 'digj3w8rk');
      data.append("upload_preset", "bb7forio");
  
      await axios.post(
        `	https://api.cloudinary.com/v1_1/digj3w8rk/image/upload`,
        data
      )
      .then(async res => {
        setImageURL(res.data.secure_url);
      })
      .catch(err => console.log(err))
    }
  }
  
  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 400, 400, 'JPEG/PNG/JPG', 100, 0,
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
    <div className='text-2xl text-black'>
      {
        step === 1 ?
          <div className='flex flex-col items-start'>
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
          </div>
        :
        step === 2 ? 
          <ArticleBodyCreator
            setBody={setBody}
          />
        :
        step === 3 ?
          <button 
            onClick={postArticle}
            className="cursor-pointer w-72 h-20 mt-5 bg-red-500 text-black rounded-md"
          >
            Stwórz artykuł
          </button>
        :
        null
      }
      {
        step !== 3 ?
        <button 
          className='w-full py-6 bg-red-500 rounded-md mt-20 mb-5 text-black flex justify-center items-center'
          onClick={() => setStep(step+1)}>
          Dalej
        </button>
        :
        null
      }
    </div>
  )
}

export default CreateArticle;