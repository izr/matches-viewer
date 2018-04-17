import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import MainPage from './components/MainPage'
import TeamPage from './components/TeamPage'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/team/:teamId" component={TeamPage} />
          <Route component={MainPage} />
        </Switch>
      </div>
    )
  }
}
