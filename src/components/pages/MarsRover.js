import React from 'react'
import DatePicker from 'react-datepicker';

const MarsRover = (props) => {
    
  let roverList = props.roverState.rover.map( (item, index) => (
    <option value={index}>{item}</option>
  ) )

  let cameraList = props.roverState.camera.map( (item, index) => (
    <option value={index}>{item}</option>
  ) )

  var photoList;
  if (!props.roverState.data.photos) {
    photoList = 'nejsou';
  } else {
    photoList = props.roverState.data.photos.map( (item, index) => (
      <li key={item.id}><img src={item.img_src} alt=""/></li>
    ) )
  }

  return (
    <div>
      <img src="" alt=""/>
      <select name="" id="" onChange={props.selectRover} >
        {roverList}
      </select>
      <select name="" id="" onChange={props.selectCamera} >
        {cameraList}
      </select>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={props.roverState.date}
        onChange={props.handleChange}
        onClick={props.handleChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <button onClick={props.getMarsRover}>Mars!</button>
      <div className="d-grid">
        {photoList}
      </div>
    </div>
  )
}

export default MarsRover
