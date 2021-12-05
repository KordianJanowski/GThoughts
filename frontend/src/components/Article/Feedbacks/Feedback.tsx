import React, { useState } from 'react'
import axios from 'axios'

import API_URL from '../../../API_URL';
import { Ifeedback } from '../../../models/models';
import {user, authorization} from '../../../models/const-variables';
import ApproveLayer from '../../ApproveLayer'

type Props = {
  feedback: Ifeedback;
}

const Feedbacks: React.FC<Props> = ({ feedback }) =>{
  const[isDeleted, setIsDeleted] = useState(false);

  const[selectedFeedbackID, setSelectedFeedbackID] = useState<string | undefined>('');
  const[isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);

  const toggleDeleteFeedbackLayer = (id?: string) =>{
    setSelectedFeedbackID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteComment = async () =>{
    await axios.delete(`${API_URL}/feedbacks/${selectedFeedbackID}`, authorization)
    .then(() => {
      setIsDeleted(true)
      setIsDeleteLayerShow(!isDeleteLayerShow);
    })
    .catch(err => console.log(err))
  }

  return(
    <div>
      { isDeleteLayerShow ?
        <ApproveLayer
          id={selectedFeedbackID}
          toggleLayer={toggleDeleteFeedbackLayer}
          approve={deleteComment}
        />
      : null}
      { !isDeleted ?
        <div key={ feedback.id_ }>
          <img src={ feedback.user_avatar } alt="" />
          <div>{ feedback.username }</div>
          <div>{ feedback.body }</div>
          { user?.id === feedback.user_id ?
          <button onClick={() => toggleDeleteFeedbackLayer(feedback.id)}>delete feedback</button>
          : null}

        </div>
      : null}
    </div>
  )
}

export default Feedbacks;