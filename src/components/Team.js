import React from 'react'
import './team.css'

export default ({ team }) => (
  <div className={team.favorite ? 'team-favorite' : ''}>{team.name}</div>
)
