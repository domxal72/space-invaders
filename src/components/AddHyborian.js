import React, { Component } from 'react'

export class AddHyborian extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.addHyborian}>AH</button>
      </div>
    )
  }
}

export default AddHyborian
