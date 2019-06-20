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
import APOD from "./components/pages/APOD";
import Maps from "./components/pages/Maps";
import MarsRover from "./components/pages/MarsRover";
import EPIC from "./components/pages/EPIC";

class App extends Component {
  constructor(){
    super()

    // Initial App level state
    this.state = {
      loading: false,
      apodState: {
        date: new Date(),
        data: {},
      },
      epicState: {
        date: new Date(),
        data: [],
      },
      marsRoverState: {
        date: new Date(),
        data: {},
        type: 'natural'
      }
    }

  }


  // APOD methods
  handleChange = (date) => {
    this.setState({ apodState: { date: date, data: this.state.apodState.data } });
    console.log(this.state.apodState.data)
  }

  handleChangeEpic = (date) => {
    this.setState({ epicState: { date: date, data: this.state.epicState.data } }, this.getEpic );
    console.log(this.state.epicState.data)
  }

  getApod = () => {
 
    let formatedDate = moment(this.state.apodState.date).format('YYYY-MM-DD');

    axios.get(`https://api.nasa.gov/planetary/apod?date=${formatedDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    .then( (res) => {
      console.log(res);
      this.setState({ apodState: { date: this.state.apodState.date, data: res.data} })
    })
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


  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>

            <Route exact path="/" component={Home} />

            <Route path="/about" render={ props => (
              <About testProp={"mrtvej brouk"} {...props}/>
            ) } testProp={"mrtvej brouk"} /> 

            <Route path="/apod" render={ props => (
              <APOD apodState={this.state.apodState} getApod={this.getApod} prevApod={this.prevApod} nextApod={this.nextApod} handleChange={this.handleChange} />
            ) } />

            <Route path="/marsrover" component={MarsRover} />
            {/* <Route path="/map" component={Maps} dat={this.state.chan} chanfun={this.chanfun}></Route> */}

            <Route path="/map" render={ props => (
              <Maps dat={this.state} chanfun={this.chanfun} />
              )
            } />
            <Route path="/epic" render={ props => (
              <EPIC epicState={this.state.epicState} getEpic={this.getEpic} handleChange={this.handleChangeEpic} />
            ) } />

          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  APOD: PropTypes.object,
}

export default App;
