import { RSAA } from 'redux-api-middleware'

export const loadGamesActions = {
  REQUEST: 'REQUEST_GAMES',
  SUCCESS: 'SUCCESS_GAMES',
  FAILURE: 'FAILURE_GAMES',
}

export const loadTeamsActions = {
  REQUEST: 'REQUEST_TEAMS',
  SUCCESS: 'SUCCESS_TEAMS',
  FAILURE: 'FAILURE_TEAMS',
}

export const loadMaxGoalsActions = {
  REQUEST: 'REQUEST_GOALS',
  SUCCESS: 'SUCCESS_GOALS',
  FAILURE: 'FAILURE_GOALS',
}

export const loadCompetitorsActions = {
  REQUEST: 'REQUEST_COMPETITORS',
  SUCCESS: 'SUCCESS_COMPETITORS',
  FAILURE: 'FAILURE_COMPETITORS',
}

export const setFavoriteTeamActions = {
  REQUEST: 'REQUEST_TOGGLE_FAVORITE',
  SUCCESS: 'SUCCESS_TOGGLE_FAVORITE',
  FAILURE: 'FAILURE_TOGGLE_FAVORITE',
}

export function toggleFavorite(teamId) {
  return {
    [RSAA]: {
      endpoint: '/api/toggleFavorite?teamid=' + teamId,
      method: 'POST',
      types: [
        {
          type: setFavoriteTeamActions.REQUEST,
          meta: teamId,
        },
        { type: setFavoriteTeamActions.SUCCESS, meta: teamId },
        { type: setFavoriteTeamActions.FAILURE, meta: teamId },
      ],
    },
  }
}

export function loadTeams() {
  return {
    [RSAA]: {
      endpoint: '/api/getTeams',
      method: 'GET',
      types: Object.values(loadTeamsActions),
    },
  }
}

export function loadCompetitors(teamId) {
  return {
    [RSAA]: {
      endpoint: '/api/getClosestAndFurthestTeams?teamId=' + teamId,
      method: 'GET',
      types: Object.values(loadCompetitorsActions),
    },
  }
}

export function loadGoals(teamId) {
  return {
    [RSAA]: {
      endpoint: '/api/getMaxGoals?teamid=' + teamId,
      method: 'GET',
      types: Object.values(loadMaxGoalsActions),
    },
  }
}

export function loadGames() {
  return {
    [RSAA]: {
      endpoint: '/api/getGamesWithTeams',
      method: 'GET',
      types: Object.values(loadGamesActions),
    },
  }
}
