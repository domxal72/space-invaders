import React, { useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { MarsRoverContext } from '../../contexts/MarsRoverProvider';
import MarsRoverData from '../MarsRoverData';

const MarsRover = (props) => {

  const { marsRoverState, handleSol, selectDateType, selectRover, handleChange, getMarsRover } = useContext(MarsRoverContext)



  const {  
    date,
    sol,
    dateTypeSet,
    rover,
    roverSet,
    roverManifest 
  } = marsRoverState

  useEffect( () => {
    getMarsRover()
  }, [] )
    
  let roverList = marsRoverState.rover.map( (item, index) => {
    if ( index === roverSet ) {
      return <option key={index} value={index}>{item}</option>
      // return <option key={index} value={null}>{item}</option>
    } else {
      return <option key={index} value={index}>{item}</option>
    }
   } )

  let dateTypeList = marsRoverState.dateType.map( (item, index) => (
    <option key={index} value={index}>{item}</option>
  ) )


  let dateType = dateTypeSet === 0 
                  ?
                  <div className="input-wrapper" >
                    <label htmlFor="">Select Earth date:</label>
                    <DatePicker
                      className="input-wrapper__number"
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
                  </div>
                  :
                  <div className="input-wrapper" >
                    <label htmlFor="sol-number">Select Sol: 
                      <span className="float-right">(max sol: {roverManifest[rover[roverSet]].max_sol})</span>
                    </label>
                    <input className="input-wrapper__number" name="sol-number" type="number" value={sol} min={1} max={roverManifest[rover[roverSet]].max_sol} onChange={handleSol} /> 
                  </div>

  const submitMarsRover = (e) => {
    e.preventDefault();
    getMarsRover();
  }



  return (
    <div>
      <h1>Mars Rover Photos</h1>
      <p>This API is designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars.</p>
      <p>Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date.</p>
      <p>Usage: Select rover and available Earth date or Mars sol from which you want to get photos. Then just simply click "Get Photos" button. Photos will show on your screen in a moment and then you can select all photos or only those taken from specific camera. If there were no photos taken on selected rover and day, just try another day.</p>

      <img src="" alt=""/>

      <form action="">
        <div className="grid">
          <div className="input-wrapper" >
            <label htmlFor="rover-select">Select rover:</label>
            {/* <select className="input-wrapper__select" name="rover-select" id="rover-select" onChange={selectRover} defaultValue={roverSet} > */}
            <select className="input-wrapper__select" name="rover-select" id="rover-select" onChange={selectRover} >
              { roverList }
            </select>
            <div className="custom-select-mark"></div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="date-select">Select date type:</label>
            <select className="input-wrapper__select" name="date-select" id="date-select" onChange={selectDateType} >
              { dateTypeList }
            </select>
            <div className="custom-select-mark"></div>
          </div>
          
            { dateType }

          <div className="input-wrapper" >
            <input type="submit" value="Get Photos" onClick={submitMarsRover} /> 
          </div>
        </div>
      </form>
      
      <MarsRoverData />
    </div>
  )
}

export default MarsRover
