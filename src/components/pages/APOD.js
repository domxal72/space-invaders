import React, { useContext } from 'react';

// Components
import ApodData from '../ApodData';
import DatePicker from 'react-datepicker';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { ApodContext } from '../../contexts/ApodProvider';

const Apod = (props) => {

  const { apodState, changeState, getApod, handleChange } = useContext(ApodContext)

  const { date } = apodState

  return (
    <div>
      <button onClick={getApod}>clickuju</button>
      <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={handleChange}
          onClick={handleChange}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={apodState.minDate}
          maxDate={new Date()}
        />
        <ApodData />
    </div>
  )
}

export default Apod
