import React, { useContext } from 'react';

// Components
import Loader from './Loader'
import InfoMsg from './InfoMsg';

// Contexts
import { ApodContext } from '../contexts/ApodProvider';

const ApodTestChild = (props) => {

  const { apodState: { data }, generalState: { loading, infoMsg } } = useContext(ApodContext)

  const { title, date, url, explanation, media_type } = data;

  let media = '';

  let apodStyle = {backgroundColor: 'none'}

  switch(media_type) {
    case 'image':
      media = <img src={url} alt=""/>;
      break;
    case 'video':
      media = <iframe 
                title="apod-video-mime-type" 
                width="100%" 
                height="500" 
                src={url} 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              >
              </iframe>
      break;
    default:
      media = 'unidentified MIME-type';
  }

  if(loading) {
    return <Loader />
  }
    
  return (
    <div style={apodStyle}>
      { title 
        ?
        <div>
          <div>{media}</div>
          <h1>{title}</h1>
          <h1>{date}</h1>
          <p>{explanation}</p>
          <p><a target="_blank" href={url}><b>original image</b></a></p>
        </div>
        :  
        <p>select APOD date</p>
      }
      <InfoMsg infoMsg={infoMsg} />
      
    </div>
  )
}

export default ApodTestChild
