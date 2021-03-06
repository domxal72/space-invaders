import React, { useContext, useEffect } from 'react';
import moment from 'moment';

// Contexts
import InfoMsg from './InfoMsg';
import Loader from './Loader';
import { EpicContext } from '../contexts/EpicProvider';
import { GeneralContext } from '../contexts/GeneralProvider';

const EpicData = (props) => {

  // API documentation
  // https://epic.gsfc.nasa.gov/about/api

  const { epicState, handleFullImage, getEpic, setEpicState } = useContext(EpicContext)

  const { generalState: { infoMsg, loading } } = useContext(GeneralContext)

  const { date, data, type, typeLink, typeActive, currentSlide } = epicState

  const slideShow = (index) => {

    window.slideshow = setInterval( () => {
      setEpicState( { ...epicState, currentSlide: index }) 
      if ( index + 1 >= data.length ) {
        index = 0;
      } else {
        index += 1;
      }
    }, 1000);
    
  }

  const stopSlideShow = () => {
    clearInterval( window.slideshow );
  }

  useEffect( () => {
    getEpic();
  }, [] )

  let formatedDateImg = data.length > 0 
                        ? 
                        moment(data[0].date.split(' ')[0]).format('YYYY/MM/DD') 
                        : 
                        moment(date).format('YYYY/MM/DD');

  let fullImg = data.length > 0 
                ? 
                <img id="full-img" 
                  src={`https://epic.gsfc.nasa.gov/archive/${type[typeActive]}/${formatedDateImg}/jpg/epic_${typeLink[typeActive]}_${data[currentSlide].image.split('_')[2]}.jpg`} 
                  data-img-index={currentSlide} 
                  alt=""
                /> 
                : 
                <p></p>

  let listItems = data.map( (item, index) => (
                    <li key={item.identifier} >
                      <img 
                        className="pointer"
                        src={`https://epic.gsfc.nasa.gov/archive/${type[typeActive]}/${formatedDateImg}/thumbs/epic_${typeLink[typeActive]}_${item.image.split('_')[2]}.jpg`} 
                        data-img-index={index} 
                        onClick={handleFullImage}
                        alt="" 
                      />
                      <p>{item.date.split(" ")[1]}</p>
                      <a
                        rel="noopener noreferrer"
                        target="_blank" 
                        href={`https://epic.gsfc.nasa.gov/archive/${type[typeActive]}/${formatedDateImg}/png/epic_${typeLink[typeActive]}_${item.image.split('_')[2]}.png`}
                      >
                        HD png
                      </a>
                    </li> 
                    )
                  )

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <InfoMsg infoMsg={infoMsg} />
      <button className="start-slide-show" onClick={ () => slideShow(currentSlide) }>play</button>
      <button className="slideshow" onClick={ () => stopSlideShow() }>stop</button>
      <ul>
        {listItems}
      </ul>
      {fullImg}
    </div>
  )
}

export default EpicData
