import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import { IarticleBody, InewHashtag } from '../models/models'
import { user, jwt, authorization, changeTagsType, postImage } from '../models/const-variables'
import { FormattedMessage } from 'react-intl';
import { LOCALES } from './../i18n/locales';
import ArticleBodyCreator from '../components/ArticleBodyCreator'
import Navbar from '../components/Navbar'

const CreateArticle: React.FC = () => {
  const history: any = useHistory();
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;
  const [body, setBody] = useState<IarticleBody>();
  const [image, setImage] = useState<any>('');
  const [imageLocalURL, setImageLocalURL] = useState<string>();
  const [creatorValidationMessage, setCreatorValidationMessage] = useState<string>('');
  const [creatorValidationError, setCreatorValidationError] = useState<boolean>(false);

  useEffect(() => {
    if(!jwt) return history.push('/login')// eslint-disable-next-line
  }, [])

  const postArticle = async (article:any) => {
    await axios.post(`${API_URL}/articles`, article, authorization)
    .then(async articleResponse => {
      await axios.get(`${API_URL}/users/me`, authorization)
      .then(async res =>{
        const newArticles: string[] = res.data.articles_ids;
        newArticles.push(articleResponse.data.id)

        await axios.put(`${API_URL}/users/me`, { articles_ids: newArticles }, authorization)
        .then(() => history.push(`/articles/${articleResponse.data.id}`))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    postHashtags()
  }

  const postHashtags = async () => {
    let tags = await changeTagsType(values.tagsAsString)

    tags.forEach(async tag => {
      const newHashtag:InewHashtag = {
        name: tag
      }
      await axios.post(`${API_URL}/hashtags`, newHashtag, authorization)
      .catch(err => console.log(err))
    })
  }

  const validateEditorState = () => {
    if(body) {
      if(body!.html === '') {
        setCreatorValidationMessage!(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`);
        setCreatorValidationError(true);
      } else {
        setCreatorValidationError(false);
      }
    } else {
      setCreatorValidationMessage!(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`);
      setCreatorValidationError(true);
    }
  }

  useEffect(() => {
    if(body) validateEditorState()
  }, [body])

  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      title: '',
      tagsAsString: '',
      imageValidation: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, `${ isI18NisEnglish ? 'Title have to contain at least 5 characters' : 'Tytuł musi zawierać co najmniej 5 znaków' }`)
        .max(75, `${ isI18NisEnglish ? 'Title can contain up to 75 characters' : 'Tytuł może zawierać maksymalnie 75 znaków' }`)
        .required(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`)
        .trim(),
      tagsAsString: Yup.string()
        .min(3, `${ isI18NisEnglish ? 'This field have to contain at least 3 characters' : 'To pole musi zawierać co najmniej 3 znaki' }`)
        .max(75, `${ isI18NisEnglish ? 'This field can contain up to 75 characters' : 'To pole może zawierać maksymalnie 75 znaków' }`)
        .required(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`)
        .trim(),
      imageValidation: Yup.string()
        .required(`${ isI18NisEnglish ? 'Image required' : 'Zdjęcie wymagane' }`),
    }),
    onSubmit: async ({title, tagsAsString}) =>{
      let imageURL = await postImage(image)
      let tags = await changeTagsType(tagsAsString)

      const article = {
        title,
        body,
        main_image: imageURL,
        author_id: user.id,
        hashtags: tags
      }

      validateEditorState()
      if(!creatorValidationError) {
        postArticle(article)
      }
    }
  })

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'><FormattedMessage id='creatorArticle'/></h2>
        </div>
        <form onSubmit={handleSubmit} className='main-bodyValue'>
          <div className='default-input-box'>
            <label><FormattedMessage id='title'/></label>
            <input
              type="text"
              name="title"
              placeholder={`${isI18NisEnglish ? 'Example: Why programming is good for our brains ?' : 'Np. Dlaczego programowanie jest korzystne dla naszego mózgu ?'}`}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className="creator-input"
            />
            {touched.title && errors.title ? (
              <p className='mt-1 text-red-500 font-normal'>{errors.title}</p>
            ): null}
          </div>
          <div className='default-input-box'>
            <label><FormattedMessage id='hashtag'/></label>
            <input
              type="text"
              name="tagsAsString"
              placeholder={`${isI18NisEnglish ? 'Programing, Brain' : 'Programowanie, Mózg'}`}
              value={values.tagsAsString}
              onChange={handleChange}
              onBlur={handleBlur}
              className="creator-input"
            />
            {touched.tagsAsString && errors.tagsAsString ? (
              <p className='mt-1 text-red-500 font-normal'>{errors.tagsAsString}</p>
            ): null}
          </div>
          <div className="default-input-box">
            <label><FormattedMessage id='mainImage'/></label>
            <div className="min-h-12 w-full md:w-72 text-sm sm:text-base flex flex-col items-start text-white bg-second border border-gray-600 mt-1 px-3 py-2 rounded-lg">
              <input
                type="file"
                accept="image/png, image/jpeg"
                name="imageValidation"
                onChange={(e: any) => {
                  if(e.currentTarget.files[0]) {
                    setImage(e.currentTarget.files[0])
                    setImageLocalURL(URL.createObjectURL(e.currentTarget.files[0]))
                    touched.imageValidation = false
                    values.imageValidation = '-'
                  }
                }}
                className={image ? 'mb-2' : ''}
              />
              <img src={imageLocalURL} className="w-96" alt="" />
            </div>
            {touched.imageValidation && errors.imageValidation ? (
              <p className='mt-1 text-red-500 font-normal'>{errors.imageValidation}</p>
            ): null}
          </div>
          <ArticleBodyCreator
            setBody={setBody}
          />
          {creatorValidationError ? (
            <p className='text-red-500 text-xs font-normal'>{creatorValidationMessage}</p>
          ): null}
          <input
            type="submit"
            onClick={validateEditorState}
            value={`${isI18NisEnglish ? 'Create article' : 'Stwórz artykuł'}`}
            className="rounded-button w-full sm:w-1/2 xl:w-80 mt-5"
          />
        </form>
      </div>
    </div>
  )
}

export default CreateArticle;