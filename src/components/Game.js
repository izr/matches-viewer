import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru'

export default ({ game }) => (
  <React.Fragment>
    {moment(game.date).format('LL')}{' '}
    <Link to={`/team/${game.team1Id}`}>{game.team1Name}</Link> ({
      game.team1Goals
    })—<Link to={`/team/${game.team2Id}`}>{game.team2Name}</Link>({
      game.team2Goals
    })
  </React.Fragment>
)
