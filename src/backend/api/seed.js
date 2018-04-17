module.exports = function(db) {
  db
    .defaults({
      teams: [
        {
          id: 1,
          name: 'Спартак',
          score: 5,
          favorite: false,
        },
        {
          id: 2,
          name: 'Манчестер Юнайтед',
          score: 2,
          favorite: false,
        },

        {
          id: 3,
          name: 'ЦСКА',
          score: 66,
          favorite: false,
        },
      ],
      games: [
        { id: 1, date: '2012-04-23T18:25:43.511Z' },
        { id: 2, date: '2015-04-23T18:25:43.511Z' },
        { id: 3, date: '2012-03-23T18:25:43.511Z' },
      ],
      gameInfo: [
        {
          id: 1,
          teamId: 1,
          gameId: 1,
          goals: 3,
        },
        {
          id: 1,
          teamId: 2,
          gameId: 1,
          goals: 1,
        },
        {
          id: 1,
          teamId: 1,
          gameId: 2,
          goals: 0,
        },
        {
          id: 1,
          teamId: 2,
          gameId: 2,
          goals: 5,
        },
        {
          id: 1,
          teamId: 1,
          gameId: 3,
          goals: 1,
        },
        {
          id: 1,
          teamId: 3,
          gameId: 3,
          goals: 55,
        },
      ],
    })
    .write()
}
