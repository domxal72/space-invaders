import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

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

    let formatedDate = moment(date).format('YYYY-MM-DD');

    setLoading();

    axios.get( `https://api.nasa.gov/EPIC/api/${type[typeActive]}/date/${formatedDate}?api_key=${process.env.REACT_APP_NASA_API_KEY}` )
      .then( (res) => {
        console.log(res.data)
        setEpicState({ ...epicState, data: res.data, currentSlide: 0 })
      })
      .then( removeLoading() )
      .catch( () => {
          showInfoMessage('Sorry, no EPIC data for selected date', 'not-found');
          setEpicState({ ...epicState, data: [] })
          console.log('fetch error')
        }
      )
  }

    return (
      <EpicContext.Provider
        value={
          { epicState, getEpic, handleChange, generalState, setType, startSlideShow, handleFullImage, setEpicState }
        }
      >
        {props.children}
      </EpicContext.Provider>
    )
}

export default EpicProvider

