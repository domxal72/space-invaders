import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
  constructor(props) {
    super(props);
    this.usa = this.usa.bind(this);
  }

  usa(){
    console.log(this.state.usa);
  }

  state = {
    usa: 'name',
  }

  
  
  render() {


    const nasaApiKey = 'Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO';
    // key usage in url example: https://api.nasa.gov/planetary/apod?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO
    // const apod = "https://api.nasa.gov/planetary/apod?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO";

    let apod = {data: 'nee'};

    axios.get('https://api.nasa.gov/planetary/apod?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO')
    .then(function (response) {
      console.log(response);
      document.getElementById('apod').innerHTML = `<img src=${response.data.url} />`
    })
    
    // fetch('https://api.nasa.gov/planetary/apod?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO')
    //   .then(function(response) {
    //     return response.json();
    //   })
      // .then(function(apodJson) {
      //   // JSON.stringify(apodJson);
      //   // console.log(JSON.stringify(apodJson));
      //   apod.data = apodJson;
      // });


    console.log(apod.data);


    return (
      <div onClick={this.usa}>
        {nasaApiKey}
        {/* <img src="https://api.nasa.gov/planetary/apod?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO" alt=""/> */}
        {/* <img src={apod.json.url} alt=""/> */}
        {/* <img id="apod" src={null} alt=""/> */}
        <div id="apod">

        </div>
      </div>
    );
  }
}

export default Test;
