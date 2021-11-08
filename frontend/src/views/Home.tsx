import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import Cookies from 'universal-cookie';

import {user, jwt} from '../models/const-variables'

const Home: React.FC = () =>{
  const cookies = new Cookies()
  const[isWorking, setIsWorking] = useState<boolean>(true)


  useEffect(() => {
    axios.get(API_URL + '/articles/617c4d6203c0273430894205')
    .then(res => console.log(res))
    .catch( err => console.log(err))
  }, [])

  return(
    <div>
      { isWorking ? <h1>siema to dziala</h1> : <h1>siema to nie dziala</h1> }
      { API_URL }
    </div>
  )
}

export default Home;