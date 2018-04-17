import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadGames, loadTeams } from '../actions'
import { withRouter } from 'react-router-dom'
import GameList from './GamesList'
import CircularProgress from 'material-ui/CircularProgress'

class MainPage extends Component {
  componentDidMount() {
    this.props.loadGames()
    this.props.loadTeams()
  }
  render() {
    const { games } = this.props
    return (
      <div className="App">
        {games.loading ? (
          <CircularProgress />
        ) : (
          <GameList games={games.list} title="Игры" />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadGames, loadTeams }, dispatch)

const mapStateToProps = (state, props) => ({
  games: state.games,
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage),
)
