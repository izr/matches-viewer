export default actions => {
  return (state = { loading: true, error: false, list: null }, action) => {
    switch (action.type) {
      case actions.REQUEST:
        return {
          ...state,
          loading: true,
        }
      case actions.FAILURE:
        return { ...state, error: true, loading: false }
      case actions.SUCCESS:
        return { ...state, error: false, loading: false, list: action.payload }
      default:
        return state
    }
  }
}
