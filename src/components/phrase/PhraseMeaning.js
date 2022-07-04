import React from 'react'
import { DisplayNames } from './PhraseConst'
import ReactHtmlParser from 'react-html-parser'
import { getPhrase } from '../../service/PhraseService'

export default function PhraseMeaning(props) {
  const sources = Object.keys(props.phrase.content)
  if (!sources.length) { return '' }
  const handleClick = e => {
    e.preventDefault()
    const han = e.target.getAttribute('href')
    getPhrase(han)
      .then(response => {
        if (response.ok) { return response.json() }
        return null
      })
      .then(body => {
        if (!body) return
        const data = body.data
        if (data) {
          props.triggerModal(data)
        } else {
          const emptyData = { han: han, info: 'Không tìm thấy dữ liệu', content: {} }
          props.triggerModal(emptyData);
        }
      })
  }
  const display = ReactHtmlParser(props.phrase.content[props.source].meanings, {
    transform: (node, index) => {
      if (node.name === 'a') {
        return <a key={index} href={node.children[0].data} onClick={handleClick} className='han'> {node.children[0].data} </a>
      }
    }
  })
  if (props.source === 'nguyendu' && props.phrase.content[props.source].han.length > 1) {
    return (
      <div className='normal-font'>
        <div>
          <strong className='normal-font'>{DisplayNames['viet']}</strong>:
          <span className='fst-italic normal-font'> {props.phrase.content[props.source].viet} </span>
        </div>
        {display}
      </div>
    )
  } else {
    return <div className='normal-font'> {display} </div>
  }
}
