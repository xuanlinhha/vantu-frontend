import React, { useState } from 'react'
import CommonHelper from '../helper/CommonHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {ButtonListV2, ButtonListV3} from '../components/common/ButtonList'
import PhraseInfo from '../components/phrase/PhraseInfo'
import PhraseMeaning from '../components/phrase/PhraseMeaning'
import PhraseModal from '../components/phrase/PhraseModal'
import { getAllPhrasesInText } from '../service/PhraseService'

export default function Lookup() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mainState, setMainState] = useState({
    phrases: [], viewing: 0, source: ''
  })
  const [modalState, setModalState] = useState({
    showModal: false, phrases: [], viewing: 0, source: ''
  })
  
  const hans = mainState.phrases.map(phrase => { return phrase.han })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    getAllPhrasesInText(input)
      .finally(_ => {
        setLoading(false)
      })
      .then(response => {
        if (response.ok) { return response.json() }
        return null
      })
      .then(body => {
        if (!body) return
        const data = body.data
        let source = mainState.source
        if (data.length) {
          source = Object.keys(data[0].content)[0]
        }
        const newMainState = Object.assign({}, mainState, {phrases: data, viewing: 0, source: source})
        setMainState(newMainState)
      })
  }
  const handleChange = e => {
    setInput(e.target.value)
  }
  const handlePhraseClick = idx => {
    const source = Object.keys(mainState.phrases[idx].content)[0]
    const newMainState = Object.assign({}, mainState, { viewing: idx, source: source })
    setMainState(newMainState)
  }
  const handleSourceClick = source => {
    const newMainState = Object.assign({}, mainState, { source: source })
    setMainState(newMainState)
  }

  const triggerModal = (phrase) => { CommonHelper.updateModalState(modalState, setModalState, phrase) }
  const hideModal = _ => {
    const newModalState = Object.assign({}, modalState, { showModal: false, phrases: [], viewing: 0, source: '' })
    setModalState(newModalState)
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
  const searchInput = loading?
    <input type='text' className='form-control han-font rounded-pill' disabled
      value={input}
      onChange={handleChange}
    />:
    <input type='text' className='form-control han-font rounded-pill' placeholder='華語。。。'
      value={input}
      onChange={handleChange}
    />
  const searchBtn = loading?
    <button type='submit' className='btn btn-dark rounded-pill' disabled>
      <FontAwesomeIcon className='fa-spin' icon={faSpinner} />
    </button>:
    <button type='submit' className='btn btn-dark rounded-pill'>
      <span className='condensed-font fw-bold'> Tìm </span>
    </button>

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 pt-2'>
          <form onSubmit={handleSubmit}>
            <div className='form-group row my-2'>
              <div className='col-sm-11'>
                {searchInput}
              </div>
              <div className='d-grid col-sm-1 px-sm-2'>
                {searchBtn}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 pb-2 mb-2'>
          { hans.length > 0 &&
            <div>
              <ButtonListV3 items={hans} selected={mainState.viewing} onClick={idx => handlePhraseClick(idx)} />
              <PhraseInfo phrase={mainState.phrases[mainState.viewing]} triggerModal={triggerModal} />
              <ButtonListV2 items={Object.keys(mainState.phrases[mainState.viewing].content)}
                selected={mainState.source}
                onClick={source => handleSourceClick(source)}
              />
              <PhraseMeaning phrase={mainState.phrases[mainState.viewing]}
                source={mainState.source}
                triggerModal={triggerModal}
              />
            </div>
          }
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
