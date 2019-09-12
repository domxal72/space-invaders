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
    typeActive: 0
  }

  const [ epicState, setEpicState ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)

  console.log(generalState)
  console.log(epicState.type[epicState.typeActive])
  // console.log(GeneralContext)

  const handleChange = (date) => {
    setEpicState({ ...epicState, date: date });
  }

  const setEpicType = (selectedType) => {
    setEpicState({ ...epicState, typeActive: parseInt(selectedType) })
    console.log(selectedType)
    // getEpic(); // Tohle nejak nefunguje
  }

  const getEpic = () => {

    let formatedDate = moment(epicState.date).format('YYYY-MM-DD');

    setLoading();

    if (epicState.typeActive === 0 ) {
      var type = 'natural';
    } if (epicState.typeActive === 1) {
      var type = 'enhanced';
    } else {
      var type = 'natural';
    }

    // axios.get( `https://api.nasa.gov/EPIC/api/${epicState.type[epicState.typeActive]}/date/${formatedDate}?api_key=${process.env.REACT_APP_NASA_API_KEY}` )
    axios.get( `https://api.nasa.gov/EPIC/api/${type}/date/${formatedDate}?api_key=${process.env.REACT_APP_NASA_API_KEY}` )
      .then( (res) => {
        console.log(res.data)
        setEpicState({ ...epicState, data: res.data })
      })
      .then( removeLoading() )
      .catch( () => {
          showInfoMessage('Sorry, no EPIC data for selected date', 'not-found');
          setEpicState({ ...epicState, data: {} })
          console.log('fetch error')
        }
      )
    
  }

    return (
      <EpicContext.Provider
        value={
          { epicState, getEpic, handleChange, generalState, setEpicType }
        }
      >
        {props.children}
      </EpicContext.Provider>
    )
}

export default EpicProvider
