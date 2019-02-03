import React, { Component } from 'react';

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

    const { hyborians } = this.props;

    const hyboriansList = hyborians.map((hyb)=>{
      return ( <li>
                {hyb.name} and {hyb.power}
              </li>
              
      )
    })

    return (
      <div onClick={this.usa}>
      <ul>
        { hyboriansList }
      </ul>
        test
      </div>
    );
  }
}

export default Test;
