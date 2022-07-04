import React, { useState, useEffect, useRef } from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import CommonHelper from '../helper/CommonHelper'
import HomeHelper from '../helper/HomeHelper'
import ButtonList, {ButtonListV2} from '../components/common/ButtonList'
import PhraseInfo from '../components/phrase/PhraseInfo'
import PhraseMeaning from '../components/phrase/PhraseMeaning'
import PhraseModal from '../components/phrase/PhraseModal'
import PhraseList from '../components/phrase/PhraseList'

export default function Home() {
  const textarea = useRef(null);
  const [mainState, setMainState] = useState({
    phrases: [], viewing: 0, source: '',
    relatedPhrases1: [], relatedOpen1: false, relatedPhrases2: [], relatedOpen2: false
  })
  const [modalState, setModalState] = useState({
    showModal: false, phrases: [], viewing: 0, source: ''
  })
  const [textareaHeight, setTextareaHeight] = useState({ height: 300 });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTextareaHeight(3 * window.innerHeight / 5)
    }
  }, []);
  const hans = mainState.phrases.map(phrase => { return phrase.han })
  const textareaStyle = {height: textareaHeight}
  const handleReturnPosClick = event => {
    event.preventDefault()
    textarea.current.focus()
    const val = textarea.current.value
    const start = textarea.current.selectionStart
    const subString = val.substr(start, 500)
    if (subString.trim()) {
      HomeHelper.loadData(mainState, setMainState, subString)
    }
  }
  const handleHanTextAreaChange = event => {
    const val = event.target.value.trim()
    if (val.length && !mainState.phrases.length) {
      HomeHelper.loadData(mainState, setMainState, val)
    }
  }
  const handleHanTextAreaClick = event => {
    const val = event.target.value
    const start = event.target.selectionStart
    const subString = val.substr(start, 500)
    if (subString.trim()) {
      HomeHelper.loadData(mainState, setMainState, subString)
    }
  }
  const handleHanTextAreaKeyUp = event => {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      const val = event.target.value;
      const start = event.target.selectionStart;
      const subString = val.substr(start, 500);
      if (subString.trim()) {
        HomeHelper.loadData(mainState, setMainState, subString)
      }
    }
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
  const toggle1 = _ => {
    const newMainState = Object.assign({}, mainState, { relatedOpen1: !mainState.relatedOpen1})
    setMainState(newMainState)
  }
  const toggle2 = _ => {
    const newMainState = Object.assign({}, mainState, { relatedOpen2: !mainState.relatedOpen2})
    setMainState(newMainState)
  }

  const triggerModal = (phrase) => { CommonHelper.updateModalState(modalState, setModalState, phrase) }
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
  return (
    <div className='container'>
      <div className='row pb-sm-2 mb-sm-2'>
        <div className='col-sm-5'>
          <div className='text-center alert alert-secondary py-1 my-2' >
            <span className='fw-bold condensed-font text-dark'> Hán tự </span>
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip>
                  <span className='condensed-font'>copy một đoạn chữ Hán vào ô bên dưới, sau đó click vào trước từ cần tra</span>
                </Tooltip>
              }
            >
            <span className='condensed-font'>
              (<u className='text-dark'>Hướng dẫn</u >)
            </span>
            </OverlayTrigger>
            <a href="" onClick={handleReturnPosClick} className='text-dark mx-4' aria-label='reload'><FontAwesomeIcon icon={faSyncAlt}/></a>
          </div>
          <form>
            <div id='hanTextArea' className='form-group'>
              <textarea ref={textarea} className='form-control han-font mid-font-size' onChange={handleHanTextAreaChange}
                placeholder='華語。。。'
                onClick={handleHanTextAreaClick}
                onKeyUp={handleHanTextAreaKeyUp}
                style={textareaStyle}
              />
            </div>
          </form>
          <div>
            { mainState.relatedPhrases1.length > 0 &&
              <PhraseList
                title='Từ ghép bắt đầu với chữ'
                han={mainState.phrases[0].han}
                phrases={mainState.relatedPhrases1}
                isOpen={mainState.relatedOpen1}
                toggle={toggle1}
                triggerModal={triggerModal}
              />
            }
          </div>
          <div>
            { mainState.relatedPhrases2.length > 0 &&
              <PhraseList
                title='Từ ghép có chứa chữ'
                han={mainState.phrases[0].han}
                phrases={mainState.relatedPhrases2}
                isOpen={mainState.relatedOpen2}
                toggle={toggle2}
                triggerModal={triggerModal}
              />
            }
          </div>
        </div>

        <div className='col-sm-7'>
          <div className='text-center alert alert-secondary py-1 my-2' >
            <span className='fw-bold condensed-font text-dark'> Kết quả </span>
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip>
                  <span className='condensed-font'>click vào từ hoặc cụm từ xuất hiện trong đoạn, sau đó chọn nguồn dữ liệu để xem kết quả</span>
                </Tooltip>
              }
            >
            <span> <FontAwesomeIcon icon={faInfoCircle} /> </span>
            </OverlayTrigger>
          </div>
          { hans.length > 0 &&
            <div>
              <ButtonList items={hans} selected={mainState.viewing} onClick={idx => handlePhraseClick(idx)}> </ButtonList>
              <PhraseInfo phrase={mainState.phrases[mainState.viewing]} triggerModal={triggerModal} />
              <ButtonListV2 items={Object.keys(mainState.phrases[mainState.viewing].content)}
                selected={mainState.source}
                onClick={source => handleSourceClick(source)}
              />
            </div>
          }

          { hans.length > 0 &&
            <PhraseMeaning phrase={mainState.phrases[mainState.viewing]}
              source={mainState.source}
              triggerModal={triggerModal}
            />
          }
        </div>
      </div>

      <div className='row'>
        { modalState.showModal &&
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