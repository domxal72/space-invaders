import React, { useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker';


// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { MarsRoverContext } from '../../contexts/MarsRoverProvider';
import MarsRoverData from '../MarsRoverData';

const MarsRover = (props) => {

  const { marsRoverState, changeState, handleSol, selectDateType, selectRover, selectCamera, handleChange, getMarsRover } = useContext(MarsRoverContext)

  const {  
    minDate,
    date,
    sol,
    getBy,
    getBySet,
    data,
    rover,
    roverSet,
    cameraSet,
    roverManifest 
  } = marsRoverState

  useEffect( () => {
    getMarsRover()
  }, [] )
    
  let roverList = marsRoverState.rover.map( (item, index) => (
    <option key={index} value={index}>{item}</option>
  ) )

  let cameraList = roverManifest[rover[roverSet]].cameraList.map( (item, index) => (
    <option key={index} value={item}>{item}</option>
  ) )

  let dateTypeList = marsRoverState.dateType.map( (item, index) => (
    <option key={index} value={index}>{item}</option>
  ) )

  var photoList = [];
  var photoListFilter = [];
  if ( data.photos.length === 0 ) {
    photoList = 'No photos for selected date. Try another available date';
  } else {

    photoListFilter = data.photos.filter( (photo) => {
      return cameraSet === photo.camera.name || cameraSet === 'all'
    })

    photoList = photoListFilter.map( (photo) => {
      return <li className="image-list-item" key={photo.id}><img src={photo.img_src} alt=""/></li>
     } )
  }

  const submitMarsRover = (e) => {
    e.preventDefault();
    getMarsRover( document.querySelector('select[name=camera]').value )
  }

  return (
    <div>
      <img src="" alt=""/>
      <form action="">
        <select name="" id="" onChange={selectRover} >
          {roverList}
        </select>
        <select name="camera" id="" onChange={selectCamera} >
          {cameraList}
        </select>
        <select name="date-select" id="" onChange={selectDateType} >
          {dateTypeList}
        </select>
        <input type="number" value={sol} min={1} max={roverManifest[rover[roverSet]].max_sol} onChange={handleSol} />
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={handleChange}
          onClick={handleChange}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={roverManifest[rover[roverSet]].landing_date}
          maxDate={roverManifest[rover[roverSet]].max_date}
        />
        <input type="submit" value="Mars" onClick={submitMarsRover} /> 
      </form>
      <div>
        <div>showing {photoListFilter.length} photos from camera: {cameraSet} of {data.photos.length} total</div>
        <ul className="image-list">
          {photoList}
        </ul>
      </div>
      <MarsRoverData />
    </div>
  )
}

export default MarsRover
