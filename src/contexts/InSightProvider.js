import React, { createContext, useState, useContext } from 'react'
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

export const InSightContext = createContext();

const InSightContextProvider = (props) => {

  const initialState = {
    minDate: new Date('1995-06-20'),
    date: new Date(),
    data: {},
  }

  const [ inSightState, setInSightContext ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)


  const getInSight = () => {

    axios.get(`https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    .then( (res) => {
      setInSightContext({ ...inSightState, data: res.data })
    })
    .then( removeLoading() )
    .catch( () => {
        showInfoMessage('error', 'not-found');
        setInSightContext({ ...inSightState, data: {} })
      }
    )
  }

  return (
    <InSightContext.Provider
      value={
        { inSightState, getInSight, generalState }
      }
    >
      {props.children}
    </InSightContext.Provider>
  )
}

export default InSightContextProvider

