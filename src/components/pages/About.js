import React from 'react'

function About(props) {
  return (
    <div>
      <h1>About this site/app:</h1>
      <p>I have built this app just for fun and to improve my programming skills and learn some parts of ReactJS framework.</p>
      <p>This app is using data (texts, images,...) from several NASA APIs. These data are available only with special API key, which has to be bind to every request to NASA API servers. To get the API key you have to register at NASA APIs official site: <a rel="noopener noreferrer" target="_blank" href="https://api.nasa.gov/">https://api.nasa.gov/</a> and you will receive your own key by email. It is free, but each API key has <b> limit of 1000 requests per hour</b>. If you exceed this value, you will not get any data and you will have to wait one hour until limit refresh.</p>
    </div>
  )
}

export default About
