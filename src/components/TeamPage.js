import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  loadGoals,
  loadCompetitors,
  loadGames,
  loadTeams,
  toggleFavorite,
} from '../actions'
import { withRouter } from 'react-router-dom'
import Team from './Team'
import GameList from './GamesList'
import { getTeamById } from '../reducers/teams'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { getGamesByTeam } from '../reducers/games'

const Loader = ({ data, render }) => {
  if (data.loading || !data.list) return <CircularProgress />
  return render(data.list)
}

const favoriteToggleStyles = {
  // backgroundColor: 'white',
  maxWidth: '200px',
  textAlign: 'center',
}

class TeamPage extends Component {
  load = () => {
    const teamId = this.props.match.params.teamId
    this.props.loadGoals(teamId)
    this.props.loadCompetitors(teamId)
    if (!this.props.allGames.list) this.props.loadGames()
    if (!this.props.team) this.props.loadTeams()
  }
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match !== prevProps.match) {
      this.load()
    }
  }

  render() {
    const {
      teamGames,
      maxGoals,
      competitors,
      toggleFavorite,
      teams,
    } = this.props
    if (teamGames.loading || teams.loading) return <CircularProgress />
    const teamId = parseInt(this.props.match.params.teamId)
    const getTeam = getTeamById(teams)
    const team = getTeam(teamId)
    return (
      <div>
        <GameList
          games={teamGames.list}
          title={`Команда ${team.name}. Очков: ${team.score}`}
        />
        <Paper>
          <div style={{ display: 'inline-block' }}>
            <Toggle
              label="Любимая команда"
              toggled={team.favorite}
              onToggle={() => toggleFavorite(team.id)}
              style={favoriteToggleStyles}
            />
          </div>
          <Loader
            data={maxGoals}
            render={list => (
              <div>
                Максимум забито: {maxGoals.list.maxGoals} Максимум пропущено:
                {maxGoals.list.maxMissed}
              </div>
            )}
          />
          <Loader
            data={competitors}
            render={competitors => (
              <div>
                <div>
                  Ближайший конкурент:
                  <Team team={getTeam(competitors.closest)} />
                </div>
                <div>
                  Команда с наибольшим отрывом:
                  <Team team={getTeam(competitors.furthest)} />
                </div>
              </div>
            )}
          />
        </Paper>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { loadGoals, loadCompetitors, loadGames, loadTeams, toggleFavorite },
    dispatch,
  )

const mapStateToProps = (state, props) => {
  const teamId = parseInt(props.match.params.teamId)
  const teamGames = getGamesByTeam(state, {
    teamId: teamId,
  })
  return {
    maxGoals: state.maxGoals,
    competitors: state.competitors,
    teamGames: teamGames,
    allGames: state.games,
    teams: state.teams,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeamPage),
)
