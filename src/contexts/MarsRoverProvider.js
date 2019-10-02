import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

export const MarsRoverContext = createContext();


const MarsRoverProvider = (props) => {

  // rover manifest

 const initialState = {
    minDate: new Date('1995-06-20'),
    date: new Date(),
    sol: 1,
    dateType: ['earth_date', 'sol'],
    dateTypeSet: 0,
    data: { photos: [] },
    rover: ['curiosity', 'opportunity', 'spirit'],
    roverSet: 0,
    roverManifest: {
      curiosity: {
        landing_date: new Date("2012-08-06"),
        launch_date: new Date("2011-11-26"),
        // max_date: "still active",
        max_date: new Date(),
        max_sol: 2445,
        name: "Curiosity",
        status: "active",
        total_photos: 354575,
        cameraList: [
          'all',
          'FHAZ',
          'RHAZ',
          'MAST',
          'CHEMCAM',
          'MAHLI',
          'MARDI',
          'NAVCAM',
        ]
      }, 
      opportunity: {
        landing_date: new Date("2004-01-25"),
        launch_date: new Date("2003-07-07"),
        max_date: new Date("2018-06-11"),
        max_sol: 5111,
        name: "Opportunity",
        status: "complete",
        total_photos: 198439,
        cameraList: [
          'all',
          'FHAZ',
          'RHAZ',
          'NAVCAM',
          'PANCAM',
          'MINITES',
        ],
      },
      spirit: {
        landing_date: new Date("2004-01-04"),
        launch_date: new Date("2003-06-10"),
        max_date: new Date("2010-03-21"),
        max_sol: 2208,
        name: "Spirit",
        status: "complete",
        total_photos: 124550,
        cameraList: [
          'all',
          'FHAZ',
          'RHAZ',
          'NAVCAM',
          'PANCAM',
          'MINITES',
        ],
      }
    },
    cameraSet: 'all',
    cameraDesc: [
      {name: 'FHAZ', description: 'Front Hazard Avoidance Camera' },
      {name: 'RHAZ', description: 'Rear Hazard Avoidance Camera' },
      {name: 'MAST', description: 'Mast Camera' },
      {name: 'CHEMCAM', description: 'Chemistry and Camera Complex' },
      {name: 'MAHLI', description: 'Mars Hand Lens Imager' },
      {name: 'MARDI', description: 'Mars Descent Imager' },
      {name: 'NAVCAM', description: 'Navigation Camera' },
      {name: 'PANCAM', description: 'Panoramic Camera' },
      {name: 'MINITES', description: 'Miniature Thermal Emission Spectrometer (Mini-TES)' },
    ]
  }

  const [ marsRoverState, setMarsRoverState ] = useState(initialState)

  const {  
    minDate,
    date,
    sol,
    dateType,
    dateTypeSet,
    data,
    rover,
    roverSet,
    roverManifest 
  } = marsRoverState

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)

  // Mars rover methods
  const getMarsRover = async () => {

    setLoading();

    let formatedDate = '';

    switch (dateTypeSet) {
      case 0:
        formatedDate = 'earth_date=' + moment(date).format('YYYY-MM-DD');
        break;
      case 1:
        formatedDate = 'sol=' + sol;
        break;
    
      default:
        formatedDate = 'earth_date=' + moment(date).format('YYYY-MM-DD');
        break;
    }

    let camera = '';

    // Rover manifest data url
    // let photoManifest = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover[roverSet]}?&api_key=${process.env.REACT_APP_NASA_API_KEY}`

    let res = await axios.get( `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover[roverSet]}/photos?${formatedDate}&${camera}api_key=${process.env.REACT_APP_NASA_API_KEY}` )
        console.log(res);
        console.log(res.data);
        setMarsRoverState({ ...marsRoverState, data: res.data })
        removeLoading()

    // axios.get( `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover[roverSet]}/photos?${formatedDate}&${camera}api_key=${process.env.REACT_APP_NASA_API_KEY}` )
    //   .then( (res) => {
    //     console.log(res.data);
    //     setMarsRoverState({ ...marsRoverState, data: res.data })
    //     removeLoading()
    //   })
    //   .catch( (err) => {
    //     console.log(err)
    //   })
  }

  const handleChange = (date) => {
    setMarsRoverState({ ...marsRoverState, date: date });
  }

  const selectRover = (e) => {
    setMarsRoverState({ ...marsRoverState,  roverSet: parseInt(e.target.value) })
  }

  const selectCamera = (e) => {
    setMarsRoverState({ ...marsRoverState, cameraSet: e.target.value })
  }

  const selectDateType = (e) => {
    setMarsRoverState({ ...marsRoverState, dateTypeSet: parseInt(e.target.value) })
  }

  const handleSol = (e) => {
    setMarsRoverState({ ...marsRoverState, sol: parseInt(e.target.value) })
  }

  return (
    <MarsRoverContext.Provider
      value={
        { marsRoverState, generalState, getMarsRover, selectDateType, handleSol, selectRover, selectCamera, handleChange }
      }
    >
      {props.children}
    </MarsRoverContext.Provider>
  )

}

export default MarsRoverProvider