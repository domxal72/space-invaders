import React, { useContext, useEffect, } from 'react'

// Components
import SearchImageData from '../SearchImageData';

// Contexts
import { SearchImageContext } from '../../contexts/SearchImageProvider';

const SearchImage = () => {

  const { searchImageState, getImages, prevPage, nextPage, setQuery } = useContext(SearchImageContext)

  const { query, page } = searchImageState;

  useEffect( () => {
    getImages(query, page)
  }, [page] )

  const submitSearchImage = (e) => {
    e.preventDefault();
    getImages(query, 1)
  }

  return (
    <div>
      <h1>NASA Image and Video Library</h1>
      <p>Usage: Type keyword and click the button to search for images. Results are limited for 100 images per page.</p>
      <p>For more than 100 total results, use buttons to navigate pages</p>
      <form action="">
        <input type="text" onChange={setQuery} value={query} />
        <input type="submit" value="Get Images" onClick={submitSearchImage} />
      </form>
        <button onClick={() => {prevPage(page)} }>Previous page</button>
        <button onClick={() => {nextPage(page)} }>Next page</button>
      <SearchImageData />
    </div>
  )
}

export default SearchImage
