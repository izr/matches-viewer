import { combineReducers } from 'redux'
import games from './reducers/games'
import maxGoals from './reducers/maxGoals'
import competitors from './reducers/competitors'
import teams from './reducers/teams'

export default combineReducers({
  games,
  maxGoals,
  competitors,
  teams,
})
