import React from 'react'

function InfoMsg(props) {
  return (
    // props.infoMsg && <div className={props.infoMsg.type}>{props.infoMsg.msg}</div>
    props.infoMsg ? <div className={props.infoMsg.type}>{props.infoMsg.msg}</div> : ''
  )
}

export default InfoMsg
