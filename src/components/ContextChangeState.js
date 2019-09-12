import React, { Component } from 'react'
import { TestContext } from '../contexts/TestContext'

export class ContextChangeState extends Component {

  static contextType = TestContext;

  render() {

    const { changeData } = this.context;

    return (
      <div>
        <button onClick={changeData}>Chnage!</button>
      </div>
    )
  }
}

export default ContextChangeState
