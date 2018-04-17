import { loadTeamsActions, setFavoriteTeamActions } from '../actions'
import standardActionsReducer from './standardActionsReducer'
import _ from 'lodash'

export const getTeamById = _.curry((teams, id) => {
  return teams.list.find(e => e.id === id)
})

const loadReducer = standardActionsReducer(loadTeamsActions)

export default (state, action) => {
  let nextState = loadReducer(state, action)
  switch (action.type) {
    case setFavoriteTeamActions.REQUEST:
    case setFavoriteTeamActions.FAILURE:
      nextState = {
        ...nextState,
        list: nextState.list.map(
          t => (t.id === action.meta ? { ...t, favorite: !t.favorite } : t),
        ),
      }
    default:
      return nextState
  }
}
