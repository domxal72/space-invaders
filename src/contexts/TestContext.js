import React, { createContext, Component } from 'react'

export const TestContext = createContext();

class TestContextProvider extends Component {

  state = {
    date: new Date(),
    data: {
      barva: true
    },
  }

  changeData = () => {

    const { barva } = this.state.data

    this.setState({data: {barva: !barva} })
  }

  render() {
    return (
      <TestContext.Provider
        value={{
          ...this.state,
          changeData: this.changeData,
        }}
      >
        {this.props.children}
      </TestContext.Provider>
    )
  }
}

export default TestContextProvider
