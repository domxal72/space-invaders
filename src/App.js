import React, { Component } from 'react';

// SCSS global styles
import './App.scss';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// PropTypes library
import PropTypes from 'prop-types';

// additional NPM libraries
import moment from 'moment';
import axios from 'axios'

import Header from './components/Header'

// Page Components
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Apod from "./components/pages/Apod";
import Maps from "./components/pages/Maps";
import MarsRover from "./components/pages/MarsRover";
import Epic from "./components/pages/Epic";
import TestContextComponent from './components/pages/TestContextComponent';

// Context providers
import GeneralProvider from './contexts/GeneralProvider';
import ApodProvider from './contexts/ApodProvider';
import EpicProvider from './contexts/EpicProvider';

class App extends Component {
  constructor(){
    super()

    // Initial App level state
    this.state = {
      loading: false,
      infoMsg: null,
      apodState: {
        date: new Date(),
        data: {},
      },
      epicState: {
        date: new Date(),
        data: [],
        type: 'natural'
      },
      marsRoverState: {
        date: new Date(),
        data: {},
        rover: ['curiosity', 'opportunity', 'spirit'],
        roverSet: 0,
        roverManifest: {
          curiosity: {
            landing_date: "2012-08-06",
            launch_date: "2011-11-26",
            max_date: "still active",
            max_sol: 2445,
            name: "Curiosity",
            status: "active",
            total_photos: 354575,
          }, 
          opportunity: {
            landing_date: "2004-01-25",
            launch_date: "2003-07-07",
            max_date: "2018-06-11",
            max_sol: 5111,
            name: "Opportunity",
            status: "complete",
            total_photos: 198439,
          },
          spirit: {
            landing_date: "2004-01-04",
            launch_date: "2003-06-10",
            max_date: "2010-03-21",
            max_sol: 2208,
            name: "Spirit",
            status: "complete",
            total_photos: 124550,
          }
        },
        camera: ['all',
                'FHAZ',
                'RHAZ',
                'MAST',
                'CHEMCAM',
                'MAHLI',
                'MARDI',
                'NAVCAM',
                'PANCAM',
                'MINITES',
                ],
        cameraSet: 0,        
      }
    }

  }

  // Apod methods
  handleChange = (date) => {
    this.setState({ apodState: { date: date, data: this.state.apodState.data } });
    console.log(this.state.apodState.data)
  }

  handleChangeEpic = (date) => {
    this.setState({ epicState: { date: date, data: this.state.epicState.data } }, this.getEpic );
    console.log(this.state.epicState.data)
  }

  getApod = () => {

    // first Apod is 1995-06-20

    this.setState({ loading: true }) 
 
    let formatedDate = moment(this.state.apodState.date).format('YYYY-MM-DD');

    axios.get(`https://api.nasa.gov/planetary/apod?date=${formatedDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    .then( (res) => {
      console.log(res);
      this.setState({ apodState: { date: this.state.apodState.date, data: res.data}, infoMsg: null })
    })
    // .then( this.setState({ loading: false }) )
    .catch( () => {
        this.showInfoMessage('Sorry, no data found for selected date, Apod API contains data for dates from 20/06/1995 to present day or yesterday', 'not-found');
        this.setState({ apodState: { date: this.state.apodState.date, data: {} } });
      }
    )

    // setTimeout(() => {
      this.setState({ loading: false }) 
    // }, 1000);
    
  }

  prevApod = () => {
    let prevDay = moment(this.state.apodState.date).subtract(1, 'days')._d
    this.setState({ apodState: { date: prevDay, data: {} } }, this.getApod);
  }

  nextApod = () => {
    let nextDay = moment(this.state.apodState.date).add(1, 'days')._d
    this.setState({ apodState: { date: nextDay, data: {} } }, this.getApod);
  }

  // EPIC methods
  getEpic = () => {

    let formatedDate = moment(this.state.epicState.date).format('YYYY-MM-DD');

    fetch( `https://api.nasa.gov/EPIC/api/natural/date/${formatedDate}?api_key=${process.env.REACT_APP_NASA_API_KEY}` )
      .then( (res) => {
        // console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ epicState: { date: this.state.epicState.date, data: data } })
        console.log(this.state.epicState)
      })
  }

  // Mars Rover methods
  getMarsRover = () => {

    let rover = this.state.marsRoverState.rover[this.state.marsRoverState.roverSet];
    let formatedDate = moment(this.state.marsRoverState.date).format('YYYY-MM-DD');
    let sol = '';
    var camera = 'camera=' + this.state.marsRoverState.camera[this.state.marsRoverState.cameraSet];

    if (camera === 'camera=all') {
      camera = '';
    }

    let photoManifest = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=${process.env.REACT_APP_NASA_API_KEY}`

    fetch( `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${formatedDate}&${camera}&api_key=${process.env.REACT_APP_NASA_API_KEY}` )
      .then( (res) => {
        console.log(res)

        return res.json()
      })

      .then( (data) => {
        console.log(data)
        let restState = {...this.state.marsRoverState};
        restState.data = data;
        this.setState({ marsRoverState: restState })
      }) 
  }

  handleChangeRover = (date) => {
    let restState = {...this.state.marsRoverState};
    restState.date = date;
    this.setState({ marsRoverState: restState })
  }

  // Way to setState of only one nested property inside state object without overriding the others
  selectRover = (e) => {
    let restState = {...this.state.marsRoverState};
    restState.roverSet = e.target.value;
    this.setState({ marsRoverState: restState })
  }

  selectCamera = (e) => {
    let restState = {...this.state.marsRoverState};
    restState.cameraSet = e.target.value;
    this.setState({ marsRoverState: restState })
  }

  render() {
    return (
      <Router>
        <div className="App">
        <GeneralProvider>
        <ApodProvider>
        <EpicProvider>
          <Header />
          <Switch>

            <Route exact path="/" component={Home} />

            <Route path="/testcontext" component={TestContextComponent} />
            
            <Route path="/apod" component={Apod} />


            
              <Route path="/epic" component={Epic} />
            

            <Route path="/about" render={ props => (
              <About testProp={"mrtvej brouk"} {...props}/>
            ) } testProp={"mrtvej brouk"} /> 

            <Route path="/marsrover" render={ props => (
              <MarsRover roverState={this.state.marsRoverState} selectRover={this.selectRover} selectCamera={this.selectCamera} handleChange={this.handleChangeRover} getMarsRover={this.getMarsRover} />
            ) } />

            {/* <Route path="/map" component={Maps} dat={this.state.chan} chanfun={this.chanfun}></Route> */}
            <Route path="/map" render={ props => (
              <Maps dat={this.state} chanfun={this.chanfun} />
              )
            } />

          </Switch>
          </EpicProvider>
          </ApodProvider>
          </GeneralProvider>
        </div>
      </Router>
    );
  }
}

// App.propTypes = {
//   Apod: PropTypes.object,
// }

export default App;
