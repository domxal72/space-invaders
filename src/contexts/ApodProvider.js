import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

export const ApodContext = createContext();


const ApodProvider = (props) => {

  const initialState = {
    minDate: new Date('1995-06-20'),
    date: new Date(),
    data: {},
  }

  const [ apodState, setApodState ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)

  console.log(generalState)
  // console.log(GeneralContext)


  const handleChange = (date) => {
    setApodState({ ...apodState, date: date });
  }

  const getApod = () => {

    // first Apod is 1995-06-20
    const formatedDate = moment(apodState.date).format('YYYY-MM-DD');

    setLoading();

    axios.get(`https://api.nasa.gov/planetary/apod?date=${formatedDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    .then( (res) => {
      console.log(res);
      setApodState({ ...apodState, data: res.data })
      // removeLoading()
    })
    .then( removeLoading() )
    .catch( () => {
        showInfoMessage('Sorry, no data found for selected date, APOD API contains data for dates from 20/06/1995 to present day or yesterday', 'not-found');
        setApodState({ ...apodState, data: {} })
        console.log('fetch error')
      }
    )
    
  }

    return (
      <ApodContext.Provider
        value={
          { apodState, getApod, handleChange, generalState }
        }
      >
        {props.children}
      </ApodContext.Provider>
    )
}

export default ApodProvider
