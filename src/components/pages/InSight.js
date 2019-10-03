import React, { useContext, useEffect } from 'react';

// Datepicker CSS styles
import "react-datepicker/dist/react-datepicker.css";

// Contexts
import { InSightContext } from '../../contexts/InSightProvider';

const InSight = (props) => {

  const { inSightState, getInSight } = useContext(InSightContext)

  const { data } = inSightState

  var output = Object.entries(data).map(entry => {
    let key = entry[0];
    let value = entry[1];
    //use key and value here

    if ( !isNaN(key) ) {

      return (
        <tr key={key}>
          <td>{value.Last_UTC ? value.Last_UTC.split("T")[0] : "-"}</td>
          <td>{key}</td>
          
          <td>{value.AT ? value.AT.mn.toFixed(1) : '-'}</td>
          <td>{value.AT ? value.AT.av.toFixed(1) : '-'}</td>
          <td>{value.AT ? value.AT.mx.toFixed(1) : '-'}</td>
          <td>{value.HWS ? value.HWS.mn.toFixed(1) : '-'}</td>
          <td>{value.HWS ? value.HWS.av.toFixed(1) : '-'}</td>
          <td>{value.HWS ? value.HWS.mx.toFixed(1) : '-'}</td>
          <td>{value.WD && value.WD.most_common ? value.WD.most_common.compass_point : '-'}</td>
          <td>{value.PRE ? value.PRE.mn.toFixed(1) : '-'}</td>
          <td>{value.PRE ? value.PRE.av.toFixed(1) : '-'}</td>
          <td>{value.PRE ? value.PRE.mx.toFixed(1) : '-'}</td>

        </tr>
      ) 
    }
    return null
  });

  useEffect( () => {
    getInSight()
  }, [] )

  return (
    <div>
      <h1>InSight - Mars weather measurements of past few days</h1>
      <p>NASA’s InSight Mars lander takes continuous weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p> 
      <div className="table-wrap">
        <table width="100%" className="table">
          <thead>
            <tr>
              <th colSpan={2}>Time</th>
              <th colSpan={3}>Air temperature (°C)</th>
              <th colSpan={4}>Wind Speed (m/s)</th>
              <th colSpan={3}>Preassure (Pa)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date</td>
              <td>Sol</td>
              <td>Min</td>
              <td>Avg</td>
              <td>Max</td>
              <td>Min</td>
              <td>Avg</td>
              <td>Max</td>
              <td>Direction <br />(most common)</td>
              <td>Min</td>
              <td>Avg</td>
              <td>Max</td>
            </tr>
            {output}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InSight
