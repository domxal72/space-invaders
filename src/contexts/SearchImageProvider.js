import React, { createContext, useState, useContext } from 'react'
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

export const SearchImageContext = createContext();

const SearchImageProvider = (props) => {

  const initialState = {
    query: '',
    page: 1,
    data: {},
    imageDetail: {},
  }

  const [ searchImageState, setSearchImageState ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage, removeInfoMessage } = useContext(GeneralContext)

  const setQuery = (e) => {
    setSearchImageState( {...searchImageState, query: e.target.value})
  }

  const getImages = (query, page) => {

    if ( query === '' ) {
      showInfoMessage('Empty search', 'not-found');
      return
    }

    setLoading()

    axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}`)
      .then( (res) => {
        setSearchImageState({ ...searchImageState, data: res.data })
        removeLoading();
        removeInfoMessage();
        // if ( res.data.collection.items.length === 0 ) {
        //   showInfoMessage('no results', 'not-found');
        // }
        console.log(res.data)
      })
      .catch( () => {
        showInfoMessage('error ', 'not-found');
        setSearchImageState({ ...searchImageState, data: {} })
      })
  }

  const getImageDetail = (imageId) => {

    setLoading();

    axios.get(`https://images-api.nasa.gov/asset/${imageId}`)
      .then( (res) => {
        setSearchImageState({ ...searchImageState, imageDetail: res.data })
        removeLoading()
      })
      .catch( () => {
        showInfoMessage('error', 'not-found');
        setSearchImageState({ ...searchImageState, data: {} })
      })
  }

  const prevPage = (page) => {
    setSearchImageState({ ...searchImageState, page: page - 1 })
  }

  const nextPage = (page) => {
    setSearchImageState({ ...searchImageState, page: page + 1 })
  }
  
  return (
    <SearchImageContext.Provider
      value={
        { searchImageState, getImages, getImageDetail, setSearchImageState, prevPage, nextPage, setQuery, generalState }
      }
    >
      {props.children}
    </SearchImageContext.Provider>
  )
}

export default SearchImageProvider

