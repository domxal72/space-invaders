import React, { useContext, useEffect, } from 'react'
import { Link } from 'react-router-dom';

import Loader from './Loader'
import InfoMsg from './InfoMsg';

// Helpers
import { isObjectEmpty } from './helpers/Helpers';

import { SearchImageContext } from '../contexts/SearchImageProvider';

function SearchImageData() {

  const { searchImageState, generalState: { loading, infoMsg } } = useContext(SearchImageContext)

  const { data, page } = searchImageState;

  let imageList, resultsNumber, pageNum = '';

  if ( !isObjectEmpty(data) ) {
    imageList = data.collection.items.map( item => {
      const { 
        title,
        location,
        nasa_id,
        description,
        date_created,
        keywords,
        photographer,
        media_type,
        href,
      } = item.data[0];

      if ( media_type === 'image' ) {
        return ( <li className="image-list-item" key={nasa_id}>
                  <Link to={`/imagedetail/${nasa_id}`}>
                    <img src={item.links[0].href} alt=""/>
                    <div className="image-list-item-overlay">
                      <div>Title: {title}</div>
                      <div>Location: {location}</div>
                      <div>ID: {nasa_id}</div>
                      <div>Description: {description.substr(0, 150) + '...'}</div>
                      <div>Date created: {date_created}</div>
                      <div>Keywords: {keywords}</div>
                      <div>Photographer: {photographer}</div>
                    </div>
                  </Link>
                </li>
        ) 
      }
      return
    });

    resultsNumber = data.collection.metadata.total_hits !== 0 ? `Total results: ${data.collection.metadata.total_hits}` : `no results found`;
    pageNum = 'page: ' + page;
  } 

  if(loading) {
    return <Loader />
  }

  return (
    <div>
      <div>{resultsNumber}</div>
      <p>{pageNum}</p>
      <InfoMsg infoMsg={infoMsg} />
      <ul className="image-list">
        {imageList}
      </ul>
    </div>
  )
}

export default SearchImageData
