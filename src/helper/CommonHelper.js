class CommonHelper {
  updateModalState = (state, setState, phrase) => {
    const len = state.phrases.length
    const source = Object.keys(phrase.content)[0]
    if (len && state.phrases[len-1].han === phrase.han) {
      const newState = Object.assign({}, state, { viewing: len - 1, source: source })
      setState(newState)
    } else {
      const viewing = state.phrases.length
      let newPhrases = state.phrases.slice()
      newPhrases.push(phrase)
      const newState = Object.assign({}, state,
        { showModal: true, phrases: newPhrases, viewing: viewing, source: source }
      )
      setState(newState)
    }
  }
}
export default new CommonHelper()
