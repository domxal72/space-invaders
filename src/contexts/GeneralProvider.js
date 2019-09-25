import React, { createContext, useState } from 'react'

export const GeneralContext = createContext();

const GeneralProvider = (props) => {

  const initialState = {
    loading: false,
    infoMsg: null,
  }

  const [ generalState, setGeneralState ] = useState(initialState)

  const setLoading = () => {
    setGeneralState({ ...generalState, loading: true })
  } 

  const removeLoading = () => {
    setGeneralState({ ...generalState, loading: false })
  }

  const showInfoMessage = (msg, type) => {
    setGeneralState({ ...generalState, infoMsg: {msg, type} })
  } 

  const removeInfoMessage = () => {
    setGeneralState({ ...generalState, infoMsg: null })
  } 

  return (
    <GeneralContext.Provider
      value={
        { generalState, setLoading, removeLoading, showInfoMessage, removeInfoMessage }
      }
    >
    {props.children}
  </GeneralContext.Provider>
  )
}

export default GeneralProvider
