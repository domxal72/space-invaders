import React, { useContext } from 'react';

// Components
import EpicData from '../EpicData';
import DatePicker from 'react-datepicker';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { EpicContext } from '../../contexts/EpicProvider';

const Epic = (props) => {

  const { epicState, getEpic, handleChange, setEpicType } = useContext(EpicContext);

  const { minDate, date, type } = epicState

  console.log(EpicContext)

  let optionList = type.map((option, index) => (
    <option key={index} value={index}>{option}</option>
    )
  )

  return (
    <div>
      <p>EPIC - Earth Polychromatic Imaging Camera</p>
      <button onClick={getEpic}>get EPIC</button>
      <select name="epic-type" id="" onChange={ (e) => { setEpicType(e.target.value) } }>
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
      <EpicData />
      
    </div>
  )
}

export default Epic
