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
      <h1>APOD - Astronomy Picture Of the Day</h1>
      <p>Discover the cosmos! Each day a different image or photograph or sometimes even video of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</p>
      <p>Usage: Just pick a date you want and APOD will show in a moment, or then you can press buttons to navigate day by day from selected date. But remember, you can not go to the future!</p>
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
        <input className='button button--submit' type="submit" value="Get APOD" onClick={submitApod} />
      </form>
      <div className="my-m">
        <button className='button button--default' onClick={ () => ( getApod( addDays(date, -1) ) ) }>Previous day</button>
        <button className='button button--default' onClick={ () => ( getApod( addDays(date, 1) ) ) }>Next day</button>
      </div>
      <ApodData />
    </div>
  )
}

export default Apod
