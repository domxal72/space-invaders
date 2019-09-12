import React, { Component, useContext } from 'react'
import { TestContext } from '../contexts/TestContext';
import ContextChangeState from './ContextChangeState';

const TestContextSubComponent = (props) => {


    const { data } = useContext(TestContext);

    return (
      <div>
        <p>{data.barva.toString()}</p>
        {/* <ContextChangeState></ContextChangeState> */}
      </div>
    )
}

export default TestContextSubComponent
