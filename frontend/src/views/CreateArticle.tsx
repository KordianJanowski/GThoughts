import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Cookies from 'universal-cookie';
import { Link, useHistory } from "react-router-dom";
import { Iuser, IarticleBody, InewHashtag } from '../models/models'
import {user, jwt, authorization} from '../models/const-variables'
import Resizer from 'react-image-file-resizer'

const CreateArticle: React.FC = () => {
  const history: any = useHistory();

  const [articleBodies, setArticleBodies] = useState<IarticleBody[]>([]);
  const[image, setImage] = useState<any>('');

  useEffect(() => { if(!jwt) return history.push('/login') }, [])

  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 400, 400, 'JPEG/PNG/JPG', 100, 0,
    (uri) => {
      resolve(uri);
    }, 'base64' );
  });

  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      body: '',
      tags: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(4, 'title should be longer tan 4 characters').required()
        .max(50, 'title must be shortet than 50 chars').required(),
    }),
    onSubmit: async ({title}) => {
      const tagsAsString = values.tags.replaceAll(/\s/g,'')
      let tags = tagsAsString.split(',')
      tags = tags.filter(function(str) {
        return /\S/.test(str);
      });

      let isPostedImages: boolean = false;
      let imageURL: string = ''

      if(image !== ''){
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
          imageURL = res.data.secure_url;
          isPostedImages = true;
        })
        .catch(err => console.log(err))
      } else{
        isPostedImages = true;
      }

      const postArticle = async () =>{
        const article = {
          title,
          body: articleBodies,
          main_image: imageURL,
          author_id: user.id,
          author_name: user.username,
          hashtags: tags
        }

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

      if(isPostedImages) postArticle()
    }
  })

  const addArticleBody = () =>{
    const newArticleBody = {
      subtitle: values.subtitle,
      body: values.body,
      id: Math.random()
    }
    setArticleBodies([...articleBodies, newArticleBody])
    values.subtitle = '';
    values.body = '';
  }

  const deleteArticleBody = (id: number) =>{
    const index: number = articleBodies.findIndex(articleBody => articleBody.id === id);
    const newArticleBodies: IarticleBody[] = articleBodies;
    newArticleBodies.splice(index,1)

    setArticleBodies([...newArticleBodies])
  }

  const articleBodiesMap = articleBodies.map(articleBody =>{
    return(
      <div key={articleBody.id}>
        <h1>{articleBody.subtitle}</h1>
        <p>{articleBody.body}</p>
        <button onClick={() => deleteArticleBody(articleBody.id)}>delete party X</button>
      </div>
    )
  })

  return(
    <div className='text-2xl text-black'>
      <h1>Create article</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          value=''
          onChange={(e: any) => setImage(e.currentTarget.files[0])}
        />
        {image ?
          <img src={URL.createObjectURL(image)}  className=" w-96 mt-2" alt="" />
        : null}
        <input
          placeholder="title"
          onChange={handleChange}
          onBlur={handleBlur}
          name="title"
          type="text"
          maxLength={50}
          className="mb-1"
          value={values.title}
        />
        <input
          placeholder="tags"
          onChange={handleChange}
          onBlur={handleBlur}
          name="tags"
          type="text"
          maxLength={50}
          className="mb-4"
          value={values.tags}
        />
        <div className='flex flex-col mb-4'>
          <input
            placeholder="subtitle"
            name="subtitle"
            maxLength={50}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subtitle}
            className='mb-1'
          />
          <textarea
            placeholder="body"
            name="body"
            className='text-black'
            maxLength={1500}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
          ></textarea>
        </div>
        <input
          className="cursor-pointer w-full h-20 bg-gray-700 text-white rounded-md"
          type="submit"
          value="create article"
        />
      </form>
      <button className="bg-gray-300 text-black mt-1 w-72 p-1 rounded-md" onClick={addArticleBody}>add new part</button>
      { articleBodiesMap }
    </div>
  )
}

export default CreateArticle;