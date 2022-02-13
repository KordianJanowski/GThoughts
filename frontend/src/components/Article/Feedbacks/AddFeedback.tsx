import React from 'react'
import axios from 'axios'
import API_URL from '../../../API_URL'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { Ifeedback } from '../../../models/models';
import { user, jwt, authorization } from '../../../models/const-variables';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../../../i18n';

type Props = {
  articleId: string;
  feedbacks: Ifeedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<Ifeedback[]>>;
}

const AddComment: React.FC<Props> = ({ articleId, feedbacks, setFeedbacks }) =>{
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      feedbackValue: '',
    },
    validationSchema: Yup.object({
      feedbackValue: Yup.string()
        .min(2, `${ isI18NisEnglish ? 'Feedback have to contain at least 2 characters' : 'Informacja zwrotna musi zawierać co najmniej 2 znaki' }`)
        .max(1500, `${ isI18NisEnglish ? 'Feedback can contain up to 1500 characters' : 'Informacja zwrotna może zawierać maksymalnie 1500 znaków' }`)
        .required(`${ isI18NisEnglish ? 'Field required' : 'Pole wymagane' }`),
    }),
    onSubmit: async ({feedbackValue}) =>{
      const feedback: Ifeedback = {
        body: feedbackValue,
        author_id: user.id,
        article_id: articleId,
      }

      await axios.post(`${API_URL}/feedbacks`, feedback, authorization)
      .then(res => {
        setFeedbacks([res.data, ...feedbacks])
        values.feedbackValue = ''
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
              name="feedbackValue"
              placeholder={`${isI18NisEnglish ? 'Content of the feedback' : 'Treść informacji zwrotnej'}`}
              value={values.feedbackValue}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-800 text-gray-300 p-2 rounded w-full md:w-4/5 mt-3 mb-2 bg-transparent resize-none"
            ></textarea>
            <div className='w-full md:w-4/5 flex flex-col-reverse lg:flex-row justify-between'>
              <input
                type="submit"
                value={`${isI18NisEnglish ? 'Post feedback' : 'Dodaj feedback'}`}
                className="rounded-button w-40"
              />
              {touched.feedbackValue && errors.feedbackValue ? (
                <p className='mb-2 ml-2 text-red-500'>{errors.feedbackValue}</p>
              ): null}
            </div>
          </form>
        :
        <h1 className='text-lg -mb-4'>
          <Link to="/login" className='font-bold text-red-400'>
            <FormattedMessage id='loginButton'/>
          </Link>
          <FormattedMessage id='toAddFeedback'/>
        </h1>
      }
    </div>
  )
}

export default AddComment;