import React, { Component } from 'react';

 class Header extends Component {

  // let sty = {
  //   backgroundColor: blue,
  // }

  state = {
    continent: 'Hyboria',
    txt: 'of Conan'
  }

  // use of function expression and bind method
  hyborianAdventure = function(e) {
    console.log(this.state.txt)
    this.setState({
      continent: e.target.value,
    })
  }.bind(this)

  // use of arrow function
  // hyborianAdventure = () => {
  //   console.log(this.state.txt)
  // }

  render() {
    return (
      <div onClick={ this.hyborianAdventure }>
        ohoj, kreteni {this.state.continent}
        
        <form>
        
          <input type="text" onChange={this.hyborianAdventure} />
          <input type="submit" value="go!" />
        </form>
      </div>
    )
  }


}



export default Header;