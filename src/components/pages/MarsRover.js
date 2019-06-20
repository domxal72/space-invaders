import React, { Component } from 'react'
import moment from 'moment'

export class MarsRover extends Component {

  constructor(props){
    super(props)
    this.state = {img: ''}
  }

  componentWillMount() {

    let rover = 'curiosity/photos?'
    let dateFormat = 'earth_date=' + moment('2015-07-02').format('YYYY-MM-DD');
    let camera = ''

    // let nasaEPICUri = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO'
    // let nasaEPICUri = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO'
    // let nasaEPICUri = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO'
    let marsRoverUri = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
    
    const nasaApiKey = '&api_key=Z4oICfPhISVcGV2LpbEyVcnU0suwjqDWXSgPPohO';

    

    // let fetchQuery = nasaEPICUri + dateFormat
    let fetchQuery = marsRoverUri + rover + dateFormat + nasaApiKey

    fetch( fetchQuery )

      // .then( res => res.json())
      // .then( data => this.setState({apodData: data }) )

      .then( (res) => {
        console.log(res)
 
        return res.json()
      })


      .then( (data) => {
        console.log(data.photos[0].img_src)
        this.setState({ img: data.photos[0].img_src })
      }) 

  }

  render() {

    var img
    if ( this.state.img !== '' ){
      img = this.state.img
    } else {
      img = null
    }
    

    return (
      <div>
        <img src={this.state.img} alt=""/>
        OHOJ
      </div>
    )
  }
}

export default MarsRover
