import React from 'react'

export default function ButtonList(props) {
  if (!props.items.length) { return '' }
  const itemList = props.items.map((item, idx) => {
    return idx === props.selected ?
      <button type='button' className='btn btn-dark btn-sm mx-1 mixed-font' key={idx} onClick={_ => props.onClick(idx)} >
        {item}
      </button>:
      <button type='button' className='btn btn-outline-dark btn-sm mx-1 mixed-font' key={idx} onClick={_ => props.onClick(idx)} >
        {item}
      </button>
  })
  return (
    <div className='py-1 border-bottom'> {itemList} </div>
  )
}

function ButtonListV2(props) {
  if (!props.items.length) { return '' }
  const itemList = props.items.map((item, idx) => {
    return item === props.selected ?
      <button type='button' className='btn btn-dark btn-sm mx-1 mixed-font' key={idx} onClick={_ => props.onClick(item)} >
        {item}
      </button>:
      <button type='button' className='btn btn-outline-dark btn-sm mx-1 mixed-font' key={idx} onClick={_ => props.onClick(item)} >
        {item}
      </button>
  })
  return (
    <div className='py-1 border-bottom'> {itemList} </div>
  )
}

function ButtonListV3(props) {
  if (!props.items.length) { return '' }
  let itemList = [], tmpList=[]
  let currentLen = props.items[0].length
  for (let idx = 0; idx < props.items.length; idx++) {
    if (props.items[idx].length !== currentLen) {
      const tmp = <div key={currentLen} className='py-1'> {tmpList} </div>
      itemList.push(tmp)
      tmpList = []
      currentLen = props.items[idx].length
    }
    let item = null
    if (idx === props.selected) {
      item = <button
        type='button'
        className='btn btn-dark btn-sm mx-1 mixed-font'
        key={idx}
        onClick={_ => props.onClick(idx)}
      >
        {props.items[idx]}
      </button>
    } else {
      item = <button
        type='button'
        className='btn btn-outline-dark btn-sm mx-1 mixed-font'
        key={idx}
        onClick={_ => props.onClick(idx)}
      >
        {props.items[idx]}
      </button>
    }
    tmpList.push(item)
  }
  const tmp = <div key={currentLen}> {tmpList} </div>
  itemList.push(tmp)
  return <div className='py-1 border-bottom'> {itemList} </div>
}

export {ButtonListV2, ButtonListV3}