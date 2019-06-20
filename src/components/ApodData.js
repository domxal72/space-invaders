import React from 'react';

const ApodData = (props) => {

  let apodObj = props.apodData;

  // Destructuring
  let { title, date, url, explanation, media_type } = apodObj;

  let media = '';

  let apodStyle = {backgroundColor: '#95c934'}

  switch(media_type) {
    case 'image':
      media = <img src={url} alt=""/>;
      break;
    case 'video':
      media = <iframe width="560" height="315" src={apodObj.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      break;
    default:
      media = 'unidetified MIME-type';
  }
    
  return (
    <div style={apodStyle}>
      { apodObj.title ? (
        <div>
          <div>{media}</div>
          <h1>{title}</h1>
          <h1>{date}</h1>
          <p>{explanation}</p>
          <p><a target="_blank" href={url}><b>{url}</b></a></p>
        </div>
        ) : ( 
        <p>select APOD date</p>
        )
      } 
    </div>
  )
}

export default ApodData
