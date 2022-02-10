import React from 'react'
import axios from 'axios'
import API_URL from '../../../API_URL'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { Icomment } from '../../../models/models';
import { user, jwt, authorization } from '../../../models/const-variables';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../../../i18n';

type Props = {
  articleId: string;
  comments: Icomment[];
  setComments: React.Dispatch<React.SetStateAction<Icomment[]>>;
}

const AddComment: React.FC<Props> = ({ articleId, comments, setComments }) =>{
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      commentValue: '',
    },
    validationSchema: Yup.object({
      commentValue: Yup.string()
        .min(2, `${ isI18NisEnglish ? 'Comment have to contain at least 2 characters' : 'Komentarz musi zawierać co najmniej 2 znaki' }`)
        .max(1500, `${ isI18NisEnglish ? 'Title can contain up to 1500 characters' : 'Komentarz może zawierać maksymalnie 1500 znaków' }`)
        .required(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`),
    }),
    onSubmit: async ({commentValue}) =>{
      const comment: Icomment = {
        body: commentValue,
        author_id: user.id,
        article_id: articleId,
        id_: Math.random()
      }

      await axios.post(`${API_URL}/comments`, comment, authorization)
      .then(res => {
        setComments([res.data, ...comments])
        values.commentValue = ''
      })
      .catch(err => console.log(err))
    }
  })

  return(
    <div>
      {
        jwt ?
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <div className="flex flex-row items-center">
              <img src={user.avatar} alt="" className="rounded-full mr-3 w-10 h-10" />
              <h1 className="font-semibold text-lg">{ user.username }</h1>
            </div>
            <textarea
              rows={2}
              name="commentValue"
              placeholder={`${isI18NisEnglish ? 'Content of the comment' : 'Treść komentarza'}`}
              value={values.commentValue}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-800 text-gray-300 p-2 rounded w-full md:w-4/5 mt-3 mb-2 bg-transparent resize-none"
            ></textarea>
            <div className='w-full md:w-4/5 flex flex-col-reverse lg:flex-row justify-between'>
              <input
                type="submit"
                value={`${isI18NisEnglish ? 'Comment' : 'Skomentuj'}`}
                className="rounded-button w-32 md:w-40"
              />
              {touched.commentValue && errors.commentValue ? (
                <p className='mb-2 ml-2 text-red-500'>{errors.commentValue}</p>
              ): null}
            </div>
          </form>
        :
        <h1 className='text-lg -mb-4'>
          <Link to="/login" className='font-bold text-red-400'>
            <FormattedMessage id='loginButton'/>
          </Link>
          <FormattedMessage id='toAddComment'/>
        </h1>
      }
    </div>
  )
}

export default AddComment;

