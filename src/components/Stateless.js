import React from 'react'

function Stateless( props ) {
// function Stateless( { nameProp } ) {
  // props muzu destructurovat primo v tom parametru a pak uz pracovat jen s tema jednotlivejma props uvnitr

  const { nameProp } = props

  console.log(nameProp)

  return (
    <div>
      porno s negrama a {nameProp}
    </div>
  )
}

export default Stateless
