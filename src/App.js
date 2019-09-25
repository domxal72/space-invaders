import React, { Component } from 'react';

// SCSS global styles
import './App.scss';

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import ImageDetail from './components/ImageDetail'

// Page Components
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Apod from "./components/pages/Apod";
import Maps from "./components/pages/Maps";
import MarsRover from "./components/pages/MarsRover";
import Epic from "./components/pages/Epic";
import SearchImage from "./components/pages/SearchImage";
import InSight from "./components/pages/InSight";

// Context providers
import GeneralProvider from './contexts/GeneralProvider';
import ApodProvider from './contexts/ApodProvider';
import EpicProvider from './contexts/EpicProvider';
import MarsRoverProvider from './contexts/MarsRoverProvider';
import SearchImageProvider from './contexts/SearchImageProvider';
import InSightProvider from './contexts/InSightProvider';

class App extends Component {
  constructor(){
    super()
    // Initial App level state
    this.state = {}
  }


  render() {
    return (
      <Router>
        <div className="App">
        <GeneralProvider>
        <ApodProvider>
        <EpicProvider>
        <MarsRoverProvider>
        <SearchImageProvider>
        <InSightProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/apod" component={Apod} />
            <Route exact path="/apod/:date" component={Apod} />

            <Route path="/epic" component={Epic} />
            
            <Route path="/searchimage" component={SearchImage} />
            <Route path="/imagedetail/:nasa_id" component={ImageDetail} />

            <Route path="/insight" component={InSight} />
            
            <Route path="/about" component={About} /> 

            <Route path="/marsrover" component={MarsRover} />

            <Route path="/map" component={Maps} />

          </Switch>
          </InSightProvider>
          </SearchImageProvider>
          </MarsRoverProvider>
          </EpicProvider>
          </ApodProvider>
          </GeneralProvider>
        </div>
      </Router>
    );
  }
}

export default App;
