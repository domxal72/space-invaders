import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import EPICData from "../EPICData";

const EPIC = (props) => {

  return (
    <div>
      <p>EPIC - Earth Polychromatic Imaging Camera</p>
      {/* <button className="prev" onClick={this.prevApod}>Prev</button> */}
      {/* <button className="next" onClick={this.nextApod}>Next</button> */}
      <button onClick={props.getEpic}>get EPIC</button>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={props.epicState.date}
        onChange={props.handleChange}
        onClick={props.handleChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <EPICData dateSelected={props.epicState.date} epicData={props.epicState.data} handleChange={props.handleChange} />
      
    </div>
  )
}

export default EPIC
