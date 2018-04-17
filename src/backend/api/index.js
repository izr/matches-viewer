var express = require('express')
var fs = require('fs')
const path = require('path')
var uuid = require('uuid')
var _ = require('lodash')
var seed = require('./seed.js')

var app = express()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
seed(db)

function getGamesWithTeams() {
  var games = db.get('games').value()
  var results = []
  for (var game of games) {
    var gameInfo = db
      .get('gameInfo')
      .filter({ gameId: game.id })
      .value()
    var teams = db
      .get('teams')
      .filter(t => t.id == gameInfo[1].teamId || t.id == gameInfo[0].teamId)
      .value()
    results.push({
      id: game.id,
      date: game.date,
      team1Goals: gameInfo[0].goals,
      team1Id: gameInfo[0].teamId,
      team1Name: teams[0].name,
      team2Goals: gameInfo[1].goals,
      team2Id: gameInfo[1].teamId,
      team2Name: teams[1].name,
    })
  }
  return results
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/getClosestAndFurthestTeams', function(req, res) {
  var teamId = parseInt(req.query.teamId)
  var team = db
    .get('teams')
    .find({ id: teamId })
    .value()
  var scoreDistance = t => Math.abs(t.score - team.score)
  var otherTeams = db.get('teams').filter(t => t.id !== teamId)
  var closest = otherTeams.minBy(scoreDistance)
  var furthest = otherTeams.maxBy(scoreDistance)

  res.send({ closest: closest.value().id, furthest: furthest.value().id })
})

app.post('/api/toggleFavorite', function(req, res) {
  var teamId = parseInt(req.query.teamid)
  db
    .get('teams')
    .find({ id: teamId })
    .update('favorite', t => !t)
    .write()
  res.send(200)
})

app.get('/api/getTeams', function(req, res) {
  var teams = db.get('teams').value()

  res.send(teams)
})

app.get('/api/getGamesByTeam', function(req, res) {
  var gamesInfo = db
    .get('gameInfo')
    .filter({ teamId: parseInt(req.query.teamid) })
    .value()
  var gameIds = gamesInfo.map(i => i.gameid)
  var games = db
    .get('games')
    .filter(g => gameIds.includes(g.id))
    .value()

  res.send(games)
})

app.get('/api/getMaxGoals', function(req, res) {
  var teamId = parseInt(req.query.teamid)
  var gamesWithTeams = getGamesWithTeams()
  var team1Games = _(gamesWithTeams).filter({ team1Id: teamId })
  var team2Games = _(gamesWithTeams).filter({ team2Id: teamId })
  function getGoals(array, key) {
    if (array.isEmpty()) return 0
    return array.maxBy(key)[key]
  }
  var maxGoals =
    getGoals(team1Games, 'team1Goals') + getGoals(team2Games, 'team2Goals')
  var maxMissed =
    getGoals(team1Games, 'team2Goals') + getGoals(team2Games, 'team1Goals')
  res.send({ maxGoals: maxGoals, maxMissed: maxMissed })
})

app.get('/api/getGamesWithTeams', function(req, res) {
  res.send(getGamesWithTeams())
})

app.listen(3001)
