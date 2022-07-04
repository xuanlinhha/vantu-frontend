import React from 'react'
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

export default function PhraseList(props) {
  const phraseList = props.phrases.map((phrase, idx) => {
    let han = <span className='han-font'> {phrase.han} </span>
    let viet = ''
    if(phrase.content && phrase.content.nguyendu && phrase.content.nguyendu.viet) {
      viet = phrase.content.nguyendu.viet
    } else if (phrase.content && phrase.content.thieuchuu && phrase.content.thieuchuu.viet) {
      viet = phrase.content.thieuchuu.viet
    }
    return (
      <button key={idx} onClick={_=>{props.triggerModal(phrase)}}
        type='button' className='btn bg-light mx-1 my-1'> {han} {viet}
      </button>
    )
  })
  const icon = props.isOpen? <FontAwesomeIcon icon={faAngleDoubleUp} />: <FontAwesomeIcon icon={faAngleDoubleRight} />
  if (phraseList.length) {
    return (
      <div>
        <div className='text-center border py-1 my-2'>
          <strong className='font-weight-bold condensed-font'>
            {props.title}
            <span className='han-font'> {props.han} </span>
            ({phraseList.length})
          </strong>
          <button type='button' className='btn btn-dark btn-sm mx-2' onClick={props.toggle}>
            {icon}
          </button>
        </div>
        <Collapse in={props.isOpen}>
          <div className='pb-2 mb-4'>
            {phraseList}
          </div>
        </Collapse>
      </div>
    )
  } else {
    return '';
  }
}