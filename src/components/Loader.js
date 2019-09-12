import React, { Fragment } from 'react'
// import Spinner from '../img/loader.gif';
// import Spinner2 from '../img/Loading_icon.gif';
// import Spinner3 from '../img/preloader.gif';
import Spinner4 from '../img/blue_loader.gif';

function Loader(props) {
  return (
    <Fragment>
      {/* <img src={Spinner} alt=""/>
      <img src={Spinner2} alt=""/>
      <img src={Spinner3} alt=""/> */}
      <img src={Spinner4} alt="Loading..."/>
      <p>Loading...</p>
    </Fragment>
  )
}

export default Loader
