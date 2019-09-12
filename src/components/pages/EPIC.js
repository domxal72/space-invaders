import React, { useContext, useState } from 'react';

// Components
import EpicData from '../EpicData';
import DatePicker from 'react-datepicker';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { EpicContext } from '../../contexts/EpicProvider';

const Epic = (props) => {

  const { epicState, getEpic, handleChange, setEpicType } = useContext(EpicContext);

  console.log(EpicContext)

  let optionList = epicState.type.map((option, index) => (
    <option value={index}>{option}</option>
    )
  )

  return (
    <div>
      <p>EPIC - Earth Polychromatic Imaging Camera</p>
      {/* <button className="prev" onClick={this.prevApod}>Prev</button> */}
      {/* <button className="next" onClick={this.nextApod}>Next</button> */}
      <button onClick={getEpic}>get EPIC</button>
      {/* <select name="epic-type" id="">
        <option value="0" selected >Natural</option>
        <option value="1">Enhanced</option>
      </select> */}
      <select name="epic-type" id="" onChange={ (e) => { setEpicType(e.target.value) } }>
        {/* <option value="0" selected >Natural</option>
        <option value="1">Enhanced</option> */}
        {optionList}
      </select>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={epicState.date}
        // selected={startDate}
        onChange={handleChange}
        // onChange={date => setStartDate(date)}
        onClick={handleChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        // minDate={subDays(new Date(), 3)}
        // endDate={endDate}
        minDate={epicState.minDate}
        maxDate={new Date()}
      />
      <EpicData />
      
    </div>
  )
}

export default Epic
