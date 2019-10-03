import React, { useContext } from 'react';

// Components
import Loader from './Loader'
import InfoMsg from './InfoMsg';

// Contexts
import { ApodContext } from '../contexts/ApodProvider';
import { GeneralContext } from '../contexts/GeneralProvider';

const ApodTestChild = (props) => {

  // const { apodState: { data }, generalState: { loading, infoMsg } } = useContext(ApodContext)
  const { apodState: { data } } = useContext(ApodContext)

  const { generalState: { loading, infoMsg } } = useContext(GeneralContext)

  const { title, date, url, explanation, media_type } = data;

  let media = '';

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

  if (loading) {
    return <Loader />
  }
    
  return (
    <div>
      <InfoMsg infoMsg={infoMsg} />
      { title 
        ?
        <div>
          <div>{media}</div>
          <h1>{title}</h1>
          <h1>{date}</h1>
          <p>{explanation}</p>
          <p><a rel="noopener noreferrer" target="_blank" href={url}><b>original image</b></a></p>
        </div>
        :  
        <p></p>
      }
      
      
    </div>
  )
}

export default ApodTestChild
