import React from 'react'
import moment from 'moment';

const EPICData = (props) => {

  // API documentation
  // https://epic.gsfc.nasa.gov/about/api

  function handleFullImage(e){
    // console.log(e.target.getAttribute('data-img-index'))
    console.log(e.target.dataset.imgIndex)
    // let epicIndex = e.target.getAttribute('data-img-index')
    let epicIndex = e.target.dataset.imgIndex
    document.querySelector('#full-img').setAttribute('src', `https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${props.epicData[epicIndex].image}.jpg` )
  }

  let formatedDateImg = moment(props.dateSelected).format('YYYY/MM/DD');

  // let fullImg = props.epicData.length > 0 ? <img id="full-img" src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/jpg/${props.epicData[0].image}.jpg`} alt=""/> : <p>no image</p>
  let fullImg = props.epicData.length > 0 ? <img id="full-img" src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/png/${props.epicData[0].image}.png`} alt=""/> : <p>no image</p>

  let listItems = props.epicData.map( (item, index) => (
                    <li key={item.identifier} >
                      <img src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/thumbs/${item.image}.jpg`} alt="" data-img-index={index} onClick={handleFullImage} />
                      <p>{item.date.split(" ")[1]}</p>
                      <a target="_blank" href={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/png/${item.image}.png`}>HD png</a>
                    </li> 
                    )
                  )

  console.log(props.epicData.length);
  let epicTime = props.epicData.length > 0 ? props.epicData[0].date.split(" ")[1] : 'no time'

  console.log(epicTime);



  return (
    <div>
      {/* <img src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDateImg}/thumbs/${ed.image}.jpg`} alt=""/>
      <img src={`https://epic.gsfc.nasa.gov/archive/natural/2017/05/12/thumbs/epic_1b_20170512042100.jpg`} alt=""/> */}
      <ul>
        {listItems}
      </ul>
      {fullImg}
      
    </div>
  )
}

export default EPICData
