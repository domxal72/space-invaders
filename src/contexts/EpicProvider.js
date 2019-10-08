import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

import { apiKey } from '../components/helpers/Globals';

export const EpicContext = createContext();

const EpicProvider = (props) => {

  const initialState = {
    minDate: new Date("2015/07/04"),
    date: new Date(),
    data: [],
    type: ['natural', 'enhanced'],
    typeLink: ['1b', 'RGB'],
    typeActive: 0,
    currentSlide: 0,
  }

  const [ epicState, setEpicState ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)

  const { date, type, typeActive, currentSlide } = epicState

  const handleFullImage = (e) => {
    setEpicState({ ...epicState, currentSlide: parseInt(e.target.dataset.imgIndex) })
  }

  const handleChange = (date) => {
    setEpicState({ ...epicState, date: date });
  }

  const setType = (selectedType) => {
    setEpicState({ ...epicState, typeActive: parseInt(selectedType) })
  }

  const startSlideShow = () => {
    setEpicState({ ...epicState, currentSlide: currentSlide + 1 })
  }

  const getEpic = () => {

    setLoading();

    let formatedDate = moment(date).format('YYYY-MM-DD');

    axios.get( `https://api.nasa.gov/EPIC/api/${type[typeActive]}/date/${formatedDate}?api_key=${apiKey}` )
      .then( (res) => {
        setEpicState({ ...epicState, data: res.data, currentSlide: 0 })
        removeLoading();
        if ( res.data.length === 0 ){
          showInfoMessage(`Sorry, no EPIC data found for selected date: ${formatedDate}, try another available date`, 'not-found');
        }
      })
      .catch( (err) => {
        showInfoMessage('unexpected error', 'not-found');
        setEpicState({ ...epicState, data: [] })
        console.log(err)
      })
  }

  const getLatestEpic = () => {

    setLoading();

    axios.get( `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}` )
      .then( (res) => {
        setEpicState({ ...epicState, date: new Date(res.data[0].date.split(' ')[0]), data: res.data, currentSlide: 0 })
        removeLoading();
      })
      .catch( (err) => {
        showInfoMessage('error', 'not-found');
        setEpicState({ ...epicState, data: [] })
        console.log(err)
      })
  }

    return (
      <EpicContext.Provider
        value={
          { epicState, getEpic, getLatestEpic, handleChange, generalState, setType, startSlideShow, handleFullImage, setEpicState }
        }
      >
        {props.children}
      </EpicContext.Provider>
    )
}

export default EpicProvider

