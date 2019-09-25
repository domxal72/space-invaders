import React, { useContext, useEffect, Fragment } from 'react'

import { SearchImageContext } from '../contexts/SearchImageProvider';

import { isObjectEmpty } from '../components/helpers/Helpers';

const ImageDetail = ( { match } ) => {

  const { searchImageState, getImageDetail } = useContext(SearchImageContext)

  const { imageDetail } = searchImageState

  useEffect(() => {
    getImageDetail(match.params.nasa_id)
  }, []);
  
  return (
    <div>
      image detail {match.params.nasa_id}
      { !isObjectEmpty(imageDetail) 
        ? 
        <Fragment>
          <img src={imageDetail.collection.items[2].href} alt=""/>
          <a target="_blank" href={imageDetail.collection.items[1].href}>Show large</a>
          <a target="_blank" href={imageDetail.collection.items[0].href}>Show original</a>
        </Fragment>
        : 
        <p>No image selected</p>
      }
    </div>
  )
}

export default ImageDetail
