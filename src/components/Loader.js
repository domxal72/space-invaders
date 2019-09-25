import React, { Fragment } from 'react'
import Spinner from '../img/blue_loader.gif';

function Loader(props) {
  return (
    <Fragment>
      <img src={Spinner} alt="Loading..."/>
      <p>Loading...</p>
    </Fragment>
  )
}

export default Loader
