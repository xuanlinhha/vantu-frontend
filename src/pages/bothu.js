import React, { useState } from 'react'
import {BoThus} from '../data/BoThu'
import CommonHelper from '../helper/CommonHelper'
import PhraseModal from '../components/phrase/PhraseModal'
import { getPhrase } from '../service/PhraseService'

export default function BoThu(props) {
  const [modalState, setModalState] = useState({ showModal: false, phrases: [], viewing: 0, source: '' })
  const triggerModal = (phrase) => {
    CommonHelper.updateModalState(modalState, setModalState, phrase)
  }
  const handleClick = e => {
    e.preventDefault()
    const han = e.target.innerText
    getPhrase(han)
      .then(response => { if (response.ok) { return response.json() } })
      .then(data => { triggerModal(data) })
  }
  const handleModalSourceClick = (source) => {
    const newModalState = Object.assign({}, modalState, { source: source })
    setModalState(newModalState)
  }
  const handleModalNextClick = _ => {
    if(modalState.viewing < modalState.phrases.length - 1) {
      const source = Object.keys(modalState.phrases[modalState.viewing + 1].content)[0]
      const newModalState = Object.assign({}, modalState, { viewing: modalState.viewing + 1, source: source })
      setModalState(newModalState)
    }
  }
  const handleModalPrevClick = _ => {
    if (modalState.viewing > 0) {
      const source = Object.keys(modalState.phrases[modalState.viewing - 1].content)[0]
      const newModalState = Object.assign({}, modalState, { viewing: modalState.viewing - 1, source: source })
      setModalState(newModalState)
    }
  }
  const hideModal = _ => {
    const newModalState = Object.assign({}, modalState, { showModal: false, phrases: [], viewing: 0, source: '' })
    setModalState(newModalState)
  }
  const decorate = (hans, order) => {
    const items = hans.map((han, idx) => {
      if (han.length > 1) {
        const group = han.split('').map((han1, idx1) => {
           return <span className='btn btn-sm btn-outline-dark' key={idx1} onClick={handleClick}> {han1} </span>
        })
        return <span className='mx-sm-1 btn-group' key={idx}> {group} </span>
      } else {
        return <span className='mx-sm-1 btn btn-sm btn-outline-dark' key={idx} onClick={handleClick}> {han} </span>
      }
    })
    return (
      <div key={order} className='row py-sm-2 border-top'>
        <div className='col-sm-2 text-center condensed-font'>
          <span className='fw-bold'> {order+1} nét </span> ({items.length} bộ):
        </div>
        <div className='col-sm-10'> <span className='fs-5 han-font'> {items} </span> </div>
      </div>
    )
  }
  const bos = BoThus.map((hans, idx) => {
    return (
      <div className='' key={idx} >
        {decorate(hans, idx)}
      </div>
    )
  })
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='text-center py-sm-1'>
            <h3><span className='condensed-font'>214 Bộ Thủ</span></h3>
          </div>
          {bos}
        </div>
      </div>
      <div className='row'>
        {modalState.showModal &&
          <PhraseModal
            show={modalState.showModal}
            phrases={modalState.phrases}
            viewing={modalState.viewing}
            source={modalState.source}
            onClick={handleModalSourceClick}
            onNext={handleModalNextClick}
            onPrev={handleModalPrevClick}
            onHide={hideModal}
            triggerModal={triggerModal}
          />
        }
      </div>
    </div>
  )
}