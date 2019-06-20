import React  from 'react'
import DatePicker from 'react-datepicker';
import ApodData from '../ApodData';
import moment from 'moment';
import axios from 'axios'

// Import CSS styles for react-datepicker
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const APOD = (props) => {

  return (
    <div>
      <button className="prev" onClick={props.prevApod}>Prev</button>
      <button className="next" onClick={props.nextApod}>Next</button>
      <button onClick={props.getApod}>clickuju</button>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={props.apodState.date}
        onChange={props.handleChange}
        onClick={props.handleChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <ApodData dateSelected={props.apodState.date} apodData={props.apodState.data} prevApod={props.prevApod} nextApod={props.nextApod}  />
      
    </div>
  )
}

export default APOD
