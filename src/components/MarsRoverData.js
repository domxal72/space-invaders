import React, { useContext } from 'react'
import moment from 'moment';

// Contexts
import { MarsRoverContext } from '../contexts/MarsRoverProvider';

const MarsRoverData = () => {

  const { marsRoverState } = useContext(MarsRoverContext)

  const {  
    minDate,
    date,
    data,
    rover,
    roverSet,
    roverManifest 
  } = marsRoverState

  if ( Object.keys(data).length === 0 && data.constructor === Object ) {
    return 'Select Rover and camera';
  }


  let photoList = data.photos.map( (photo) => (
    <li key={photo.id}><img src={photo.img_src} alt=""/></li>
  ))

  return (
    <div>
      <ul>
        {/* {photoList} */}
      </ul>
    </div>
  )
}

export default MarsRoverData
