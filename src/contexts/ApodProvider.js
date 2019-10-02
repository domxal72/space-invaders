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

  const { generalState, setLoading, removeLoading, showInfoMessage, removeInfoMessage } = useContext(GeneralContext)

  const handleChange = (date) => {
    setApodState({ ...apodState, date: date });
  }

  const getApod = (date) => {

    setLoading();

    const formatedDate = moment(date).format('YYYY-MM-DD');

    axios.get(`https://api.nasa.gov/planetary/apod?date=${formatedDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    .then( (res) => {
      console.log(res);
      setApodState({ ...apodState, data: res.data })
      removeLoading();
      removeInfoMessage();
    })
    .catch( (err) => {
      if ( date > new Date() || date < new Date('1995-06-20') ) {
        showInfoMessage(`Sorry, no data found for selected date: ${formatedDate}, APOD API contains data only for dates from 20/06/1995 to present day`, 'not-found');
      } else {
        showInfoMessage(`Sorry, unknown server error`, 'not-found')
      }
      setApodState({ ...apodState, data: {} })
      console.log(err)
    })
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
