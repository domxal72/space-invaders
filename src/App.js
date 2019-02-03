import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header'
import Test from "./components/Test";
import Stateless from "./components/Stateless";
import AddHyborian from "./components/AddHyborian";

class App extends Component {
  constructor(){
    super()
    this.testFun = this.testFun.bind(this);
  }

  state = {
    hyborians: [ { name: 'Thulsa', power: 'snakes' },
                 { name: 'Conan', power: 'steel' }
    ]
  }

  addHyborian = () => {
    let thorgrim = {name: 'Thorgrim', power: 'Hammer'};
    // let newHybs = this.state.hyborians.push(thorgrim); // takhle by to taky slo ale je to bad practice!!!
    let newHybs = [...this.state.hyborians, thorgrim]; // takhle by to taky slo ale je to bad practice!!!
    this.setState({
      hyborians: newHybs

      // newHybs: newHybs
    })
    console.log(newHybs);
  }

  testFun = (test) => {
    console.log(test)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="red-baron">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Header />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
         <Test hyborians={this.state.hyborians}>
         test2
         </Test>
         <Stateless nameProp="subotai" />
         {/* <button onClick={ () => { this.testFun('ha!') } }>hoj</button> */}
         {/* <button onClick={function() {this.testFun('ha!')} }>hoj</button> */}
         <button onClick={ this.testFun.bind(this,'ha!') }>hoj</button>
        </header>
        <AddHyborian addHyborian={this.addHyborian} />
      </div>
    );
  }
}

export default App;
