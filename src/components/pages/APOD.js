import React, { useContext, useEffect } from 'react';

// Components
import ApodData from '../ApodData';
import DatePicker from 'react-datepicker';

// Helpers
import { addDays } from "../helpers/Helpers";

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { ApodContext } from '../../contexts/ApodProvider';

const Apod = ( props ) => {

  const { apodState, getApod, handleChange } = useContext(ApodContext)

  const { minDate, date } = apodState

  useEffect( () => { getApod(date) }, [date]);

  const submitApod = (e) => {
    e.preventDefault();
    getApod(date)
  }

  return (
    <div>
      <div>APOD - Astronomy Picture Of the Day</div>
      <form action="">
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={handleChange}
          onClick={handleChange}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={minDate}
          maxDate={new Date()}
        />
        <input type="submit" value="Get APOD" onClick={submitApod} />
      </form>
      <button onClick={ () => ( getApod( addDays(date, -1) ) ) }>Prev APOD</button>
      <button onClick={ () => ( getApod( addDays(date, 1) ) ) }>Next APOD</button>
      <ApodData />
    </div>
  )
}

export default Apod
