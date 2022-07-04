import React from 'react'
import { DisplayNames } from './PhraseConst'
import ReactHtmlParser from 'react-html-parser'
import { getPhrase } from '../../service/PhraseService'

export default function PhraseInfo(props) {
  if (!props.phrase.info) { return '' }
  const items = []
  const displayKeys = ['viet', 'bo', 'pinyin', 'phon_the', 'gian_the', 'di_the', 'nom', 'so_net', 'luc_thu', 'hinh_thai',
    'thuong_hiet', 'but_thuan', 'han_co_thong_dung', 'hien_dai_thong_dung']
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
  const displayHtml = text => {
    return ReactHtmlParser(text, {
      transform: (node, index) => {
        if (node.name === 'a') {
          return <a key={index} href={node.children[0].data} onClick={handleClick} className='han'> {node.children[0].data} </a>
        }
      }
    })
  }
  for (const key of displayKeys) {
    if (key === 'bo' || key === 'phon_the' || key === 'gian_the' || key === 'di_the' || key === 'hinh_thai') {
      items.push(
        <div key={key} className='col-sm-6'>
          <strong className='normal-font'> {DisplayNames[key]} </strong>: {displayHtml(props.phrase.info[key])}
        </div>
      )
    } else if (key === 'viet' || key === 'pinyin') {
      items.push(
        <div key={key} className='col-sm-6'>
          <strong className='normal-font'> {DisplayNames[key]} </strong>:
          <span className='normal-font'> {props.phrase.info[key]} </span>
        </div>
      )
    } else {
      items.push(
        <div key={key} className='col-sm-6'>
          <strong className='normal-font'> {DisplayNames[key]} </strong>: {props.phrase.info[key]}
        </div>
      )
    }
  }
  return (
    <div className='border-bottom'>
      <div className='row px-1'>
        <div className='col-sm-9'>
          <div className='row'>
            {items}
          </div>
        </div>
        <div className='col-sm-3 han-font big-font-size'>
          {props.phrase.han}
        </div>
      </div>
    </div>
  )
}
