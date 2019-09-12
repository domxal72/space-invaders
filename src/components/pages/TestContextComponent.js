import React, { Component, useContext } from 'react';
import TestContextSubComponent from '../TestContextSubComponent';
import TestContextProvider from '../../contexts/TestContext';
import { TestContext } from '../../contexts/TestContext';

// functional component version with hooks
const TestContextComponent = (props) => {

  // const { data } = useContext(TestContext);

  // Tady CONTEXT nefunguje asi proto, ze az pak mi to vraci TestContextProvider, jenze tim by asi mela tahle komponenta bejt obalena, takze bych ten Provier mel narvat do parentu

  return (
    <TestContextProvider>
      <div>
        <p>hajdy hou</p>
        {/* <p>{data.barva}</p> */}
        <TestContextSubComponent />
      </div>
    </TestContextProvider>
  )
}

export default TestContextComponent
