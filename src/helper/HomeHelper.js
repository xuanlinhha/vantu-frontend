import { getAllPhrasesContainingFirstChar } from '../service/PhraseService'

class HomeHelper {
  loadData = (mainState, setMainState, subString) => {
    getAllPhrasesContainingFirstChar(subString)
      .then(response => {
        if (response.ok) { return response.json() }
        return null
      })
      .then(body => {
        if (!body) return
        const data = body.data
        if (data && data[0].length) {
          const phrases = data[0]
          const relatedPhrases1 = data[1]
          const relatedPhrases2 = data[2]
          const source = Object.keys(phrases[0].content)[0]
          const newMainState = Object.assign({}, mainState, {
            phrases: phrases, viewing: 0, source: source,
            relatedPhrases1: relatedPhrases1, relatedPhrases2: relatedPhrases2
          })
          setMainState(newMainState)
        } else {
          const newMainState = Object.assign({}, mainState, { phrases: [], relatedPhrases1: [], relatedPhrases2: [] })
          setMainState(newMainState)
        }
      })
  }
}

export default new HomeHelper()
