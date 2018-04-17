import React from 'react'
import Game from './Game'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'

export default ({ games, title, leftElement }) => (
  <React.Fragment>
    <AppBar
      iconElementLeft={leftElement ? leftElement : <div />}
      title={title}
    />
    <List>
      {(games || []).map(g => (
        <ListItem key={g.id}>
          <Game game={g} />
        </ListItem>
      ))}
    </List>
  </React.Fragment>
)
