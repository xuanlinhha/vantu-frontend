import React from 'react'
import { Button, ButtonGroup, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import {ButtonListV2} from '../common/ButtonList'
import PhraseInfo from '../phrase/PhraseInfo'
import PhraseMeaning from '../phrase/PhraseMeaning'

export default function PhraseModal(props) {
  const len = props.phrases.length
  const viewingPhrase = props.phrases[props.viewing]
  const sources = Object.keys(viewingPhrase.content)
  let modalBody = ''
  if (viewingPhrase.info === 'Không tìm thấy dữ liệu') {
    modalBody = <Modal.Body> <div className='normal-font'> Không tìm thấy {viewingPhrase.han} </div> </Modal.Body>;
  } else {
    modalBody = <Modal.Body>
        <PhraseInfo phrase={viewingPhrase} triggerModal={props.triggerModal} />
        { sources.length &&
          <div>
            <ButtonListV2 items={sources} selected={props.source} onClick={source => props.onClick(source)} />
            <PhraseMeaning phrase={viewingPhrase} source={props.source} triggerModal={props.triggerModal} />
          </div>
        }
      </Modal.Body>
  }
  return (
    <div>
      <Modal size='xl' show={props.show} onHide={props.onHide}>
        <Modal.Header>
          <Modal.Title className='han-font'> {viewingPhrase.han} </Modal.Title>
          <ButtonGroup>
            <Button className='me-1' variant='dark' size='sm' disabled={props.viewing === 0} onClick={(props.viewing === 0) ? null : props.onPrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Button className='ms-1' variant='dark' size='sm' disabled={props.viewing === len-1} onClick={(props.viewing === len-1) ? null : props.onNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </ButtonGroup>
          <Button variant='link' onClick={props.onHide}>
            <FontAwesomeIcon className='text-dark' icon={faTimes} />
          </Button>
        </Modal.Header>
        {modalBody}
        <Modal.Footer>
        <Button variant='dark' onClick={props.onHide}>
          <span className='normal-font'>Close</span> 
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}