const BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL

export const getPhrase = (han) => {
  return fetch(encodeURI(`${BACK_END_URL}/phrases?han=${han}`))
}

export const getAllPhrasesContainingFirstChar = (text) => {
  return fetch(encodeURI(`${BACK_END_URL}/phrases/containing-first-char`),
    {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text: text})}
  )
}

export const getAllPhrasesInText = (text) => {
  return fetch(encodeURI(`${BACK_END_URL}/phrases/in-text`),
    {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text: text})}
  )
}
