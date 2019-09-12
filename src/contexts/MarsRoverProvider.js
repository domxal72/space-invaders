import React, { createContext, useState, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GeneralContext } from './GeneralProvider';

export const MarsRoverContext = createContext();


const MarsRoverProvider = (props) => {

  const initialState = {
    minDate: new Date('1995-06-20'),
    date: new Date(),
    data: {},
  }

  const [ marsRoverState, setMarsRoverState ] = useState(initialState)

  const { generalState, setLoading, removeLoading, showInfoMessage } = useContext(GeneralContext)

  console.log(generalState)

}