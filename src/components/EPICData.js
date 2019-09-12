import React, { useContext } from 'react'
import moment from 'moment';

// Contexts
import { EpicContext } from '../contexts/EpicProvider';

const EpicData = (props) => {

  // API documentation
  // https://epic.gsfc.nasa.gov/about/api



  const { epicState } = useContext(EpicContext)

  console.log(epicState.data)

  let epicIndexSlide = 0;
  // let epicIndexSlide;

  if (document.querySelector('#full-img') != null) {
    epicIndexSlide = document.querySelector('#full-img').dataset.imgIndex;
  }
  

  function handleFullImage(e){
    // console.log(e.target.getAttribute('data-img-index'))
    console.log(e.target.dataset.imgIndex);
    // let epicIndex = e.target.dataset.imgIndex;
    epicIndexSlide = e.target.dataset.imgIndex;
    // document.querySelector('#full-img').setAttribute('src', `https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${props.epicData[epicIndex].image}.jpg` );
    document.querySelector('#full-img').setAttribute('src', `https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${epicState.data[epicIndexSlide].image}.jpg` );
    document.querySelector('#full-img').dataset.imgIndex = epicIndexSlide;
    // epicIndexSlide = epicIndex
    console.log(epicIndexSlide);
  }

  const epicSlideShow = () => {

    // epicIndexSlide = document.querySelector('#full-img').dataset.imgIndex

    // epicIndexSlide = parseInt(document.querySelector('#full-img').dataset.imgIndex);
    // epicIndexSlide += 1;
    
    document.querySelector('#full-img').setAttribute('src', `https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${epicState.data[epicIndexSlide].image}.jpg` )

    epicIndexSlide = parseInt(document.querySelector('#full-img').dataset.imgIndex);
    epicIndexSlide += 1;
    document.querySelector('#full-img').dataset.imgIndex = epicIndexSlide;
    if ( epicIndexSlide >= epicState.data.length ) {
      epicIndexSlide = 0;
      document.querySelector('#full-img').dataset.imgIndex = 0;
    }

    console.log(epicIndexSlide)
  }

  const startEpicSlideShow = () => {
    window.epicSlideshow = setInterval( epicSlideShow, 1000);
  }

  const stopEpicSlideShow = () => {
    clearInterval( window.epicSlideshow );
  }

  if (epicState.typeActive === 0 ) {
    var type = 'natural';
  } if (epicState.typeActive === 1) {
    var type = 'enhanced';
  } else {
    var type = 'natural';
  }

  let formatedDateImg = moment(epicState.date).format('YYYY/MM/DD');

  let fullImg = epicState.data.length > 0 ? <img id="full-img" src={`https://epic.gsfc.nasa.gov/archive/${type}/${formatedDateImg}/jpg/${epicState.data[0].image}.jpg`} data-img-index={epicIndexSlide} alt=""/> : <p>no image</p>
  // let fullImg = epicState.data.length > 0 ? <img id="full-img" src={`https://epic.gsfc.nasa.gov/archive/${epicState.type[epicState.typeActive]}/${formatedDateImg}/jpg/${epicState.data[0].image}.jpg`} data-img-index={epicIndexSlide} alt=""/> : <p>no image</p>

  // let fullImg = props.epicData.length > 0 ? <img id="full-img" data-img-index={0} src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${props.epicData[0].image}.jpg`} alt=""/> : <p>no image</p>

  let listItems = epicState.data.map( (item, index) => (
                    <li key={item.identifier} >
                      <img src={`https://epic.gsfc.nasa.gov/archive/${type}/${formatedDateImg}/thumbs/${item.image}.jpg`} alt="" data-img-index={index} onClick={handleFullImage} />
                      {/* <img src={`https://epic.gsfc.nasa.gov/archive/${epicState.type[epicState.typeActive]}/${formatedDateImg}/thumbs/${item.image}.jpg`} alt="" data-img-index={index} onClick={handleFullImage} /> */}
                      {/* <img src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/thumbs/${item.image}.jpg`} alt="" data-img-index={index} /> */}
                      <p>{item.date.split(" ")[1]}</p>
                      <a target="_blank" href={`https://epic.gsfc.nasa.gov/archive/${type}/${formatedDateImg}/png/${item.image}.png`}>HD png</a>
                      {/* <a target="_blank" href={`https://epic.gsfc.nasa.gov/archive/${epicState.type[epicState.typeActive]}/${formatedDateImg}/png/${item.image}.png`}>HD png</a> */}
                    </li> 
                    )
                  )

  console.log(epicState.data.length);
  let epicTime = epicState.data > 0 ? props.epicData[0].date.split(" ")[1] : 'no time'

  console.log(epicTime);



  return (
    <div>
      {/* <img src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/thumbs/${ed.image}.jpg`} alt=""/>
      <img src={`https://epic.gsfc.nasa.gov/archive/natural/2017/05/12/thumbs/epic_1b_20170512042100.jpg`} alt=""/> */}
      <button className="start-slide-show" onClick={startEpicSlideShow}>play</button>
      <button className="slideshow" onClick={stopEpicSlideShow}>stop</button>
      <ul>
        {listItems}
      </ul>
      {fullImg}
      
    </div>
  )
}

export default EpicData
