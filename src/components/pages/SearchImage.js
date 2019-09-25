import React, { useContext, useEffect, } from 'react'

// Components
import Loader from '../Loader'
import InfoMsg from '../InfoMsg';

import { Link } from 'react-router-dom';

// Helpers
import { isObjectEmpty } from '../helpers/Helpers';

// Contexts
import { SearchImageContext } from '../../contexts/SearchImageProvider';

const SearchImage = () => {

  const { searchImageState, getImages, prevPage, nextPage, setQuery, incPage, generalState: { loading, infoMsg } } = useContext(SearchImageContext)

  const { query, data, page } = searchImageState;

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

    resultsNumber = data.collection.metadata.total_hits;
    pageNum = 'page: ' + page;
  } 

  useEffect( () => {
    getImages(query, page)
  }, [page] )

  if(loading) {
    return <Loader />
  }

  return (
    <div>
      <input type="text" onChange={setQuery} value={query} />
      <button onClick={() => {getImages(query, 1)}}>Get Images</button>
      <button onClick={() => {prevPage(page)} }>Prev page</button>
      <button onClick={() => {nextPage(page)} }>Next page</button>
      <div>{resultsNumber}</div>
      <p>{pageNum}</p>
      <ul className="image-list">
        {imageList}
      </ul>
      <InfoMsg infoMsg={infoMsg} />
    </div>
  )
}

export default SearchImage
