import React, { useReducer } from 'react';
import ApodContext from './apodContext';
import ApodReducer from './apodReducer';
import {
  GET_APOD
} from '../types'

const ApodState = props => {
  const initialState = {
    date: new Date(),
    data: {},
  }

  const [state, dispatch] = useReducer( ApodReducer, initialState )

  return <ApodContext.Provider
      value={{
        date: state.date,
        data: state.data
      }}
    >
      {props.children}
  </ApodContext.Provider>
}

export default ApodState;