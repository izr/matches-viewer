import { loadGamesActions } from '../actions'
import standardActionsReducer from './standardActionsReducer'
import { createSelector } from 'reselect'

export const getGamesByTeam = createSelector((state, props) => {
  return {
    ...state.games,
    list: (state.games.list || []).filter(
      e => e.team1Id === props.teamId || e.team2Id === props.teamId,
    ),
  }
}, games => games)

export default standardActionsReducer(loadGamesActions)
