import React, { Component } from 'react'
// import React, { Component } from 'react'
// import MapyCz from 'https://api.mapy.cz/loader.js';
// import MapyCz from '../../scripts/MapyCz';
// import Conf from '../../scripts/conf';


export class Maps extends Component {

  constructor(props){
    super(props)

  }

  render() {

    return (
      <div>
        <div>tady maj bejt mapy a je tu hovno</div>
        {/* <div>{ !this.state.chan ? this.state.chan : 'nic'}</div> */}
        <div>{this.props.dat.chan}</div>
        <button onClick={this.props.chanfun}>click</button>

        <div id="mapa-cz" style={{width: '600px', height:'400px'}}></div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3045.2989849992136!2d14.650849294383606!3d50.071662909216975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1scs!2scz!4v1556886798102!5m2!1scs!2scz" width="600" height="450" frameborder="0" allowfullscreen></iframe>
      </div>
    )
  }
}

export default Maps
