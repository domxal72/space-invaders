import React, { useContext } from 'react'

// Contexts
import { MarsRoverContext } from '../contexts/MarsRoverProvider';
import { GeneralContext } from '../contexts/GeneralProvider';

import Loader from './Loader';
const MarsRoverData = () => {

  const { marsRoverState, selectCamera } = useContext(MarsRoverContext)

  const { generalState: {loading} } = useContext(GeneralContext)

  const {  
    data,
    rover,
    roverSet,
    cameraSet,
    roverManifest,
    cameraDesc 
  } = marsRoverState

  let cameraList = roverManifest[rover[roverSet]].cameraList.map( (item, index) => (
    <option key={index} value={item}>{item}</option>
  ) )

  let photoList = [];
  let photoListFilter = [];

  if ( data.photos.length === 0 ) {
    photoList = 'No photos for selected date. Try another available date';
  } else {
    photoListFilter = data.photos.filter( (photo) => {
      return cameraSet === photo.camera.name || cameraSet === 'all'
    })
    photoList = photoListFilter.map( (photo) => {
      return (
              <li className="image-list-item" key={photo.id}>
                <a rel="noopener noreferrer" target="_blank" href={photo.img_src}>
                  <img src={photo.img_src} alt=""/>
                </a>
              </li>
              )
     } )
  }

  let cameraDescription = cameraDesc.filter((cam) => {
    return cam.name === cameraSet;
  })

  let resultsInfo = data.photos.length !== 0 
                    ? 
                    <div>
                      <div className="input-wrapper">
                        <label htmlFor="camera-select">Select camera:</label>
                        <select className="input-wrapper__select" name="camera-select" id="camera-select" onChange={selectCamera} >
                          {cameraList}
                        </select>
                        <div className="custom-select-mark"></div>
                        <div>{ cameraDescription.length !== 0 ? `${cameraDescription[0].name} - ${cameraDescription[0].description}` : ''}</div>
                      </div>
                      <div>showing {photoListFilter.length} photos from camera: {cameraSet} of {data.photos.length} total</div>
                    </div>
                    : 
                    <div></div>

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      { resultsInfo }
      <ul className="image-list">
        {photoList}
      </ul>
    </div>
  )
}

export default MarsRoverData
