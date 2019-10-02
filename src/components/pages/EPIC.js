import React, { useContext, useEffect } from 'react';

// Components
import EpicData from '../EpicData';
import DatePicker from 'react-datepicker';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { EpicContext } from '../../contexts/EpicProvider';
import { GeneralContext } from '../../contexts/GeneralProvider';

const Epic = (props) => {

  const { epicState, setEpicState, getEpic, getLatestEpic, handleChange, setType } = useContext(EpicContext);

  const { minDate, data, date, type } = epicState

  let optionList = type.map((option, index) => (
    <option key={index} value={index}>{option}</option>
    )
  )

  const submitEpic = (e) => {
    e.preventDefault();
    getEpic();
  }

  // if ( data.length === 0 ){
  //   showInfoMessage(`Sorry, no EPIC data found for selected date ${date}`, 'not-found');
  // }
  
  useEffect( () => {
    getLatestEpic();
    setEpicState({ ...epicState, date: date });
  }, []);
  
  return (
    <div>
      <h1>EPIC - Earth Polychromatic Imaging Camera</h1>
      <p>The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope.</p>
      <p>Usage: On initial load, you will get automatically EPIC photos from latest date. Then you can select image type and date you want and click "Get Photos" button.</p>
      <p>You can select photos from 4 of July 2015 to present day, but be aware that EPIC works only on certain days, weeks or even months. So you can get nothing for many selected dates, but keep trying!</p>
      <p>By clicking on thumb images, the big image will change to selected one. There is also a link to external HD image version under each thumb if you want. Or press "play" and "stop" buttons for big image slideshow and have fun!</p>
      <form action="">
        <label htmlFor="epic-type">Select image type:</label>
        <select name="epic-type" id="" onChange={ (e) => { setType(e.target.value) } }>
          {optionList}
        </select>
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
        <input type="submit" value="Get Photos" onClick={submitEpic} />
      </form>
      {/* {content} */}
      <EpicData />
    </div>
  )
}

export default Epic
