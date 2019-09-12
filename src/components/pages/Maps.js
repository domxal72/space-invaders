import React, { Component } from 'react'
// import React, { Component } from 'react'
// import MapyCz from 'https://api.mapy.cz/loader.js';
// import MapyCz from '../../scripts/MapyCz';
// import Conf from '../../scripts/conf';


export class Maps extends Component {

  render() {

    return (
      <div>
        
        <div id="mapa" style={{width: '600px', height:'400px'}}></div>
        <script type="text/javascript">
          var stred = SMap.Coords.fromWGS84(14.41, 50.08);
          var mapa = new SMap(JAK.gel("mapa"), stred, 10);
          mapa.addDefaultLayer(SMap.DEF_BASE).enable();
          mapa.addDefaultControls();	      	      
        </script>    

        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3045.2989849992136!2d14.650849294383606!3d50.071662909216975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1scs!2scz!4v1556886798102!5m2!1scs!2scz" width="600" height="450" frameborder="0" allowfullscreen></iframe>
      </div>
    )
  }
}

export default Maps
