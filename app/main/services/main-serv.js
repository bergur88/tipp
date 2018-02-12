'use strict';
angular.module('main')
.service('Main', function ($log, $timeout, $http, footballdataFactory) {

  $log.log('Hello from your Service: Main in module main');
  var svc = this;
  var apikey = '2a948f604ad3434eac24db899031fbe8';
  // some initial data
  svc.someData = {
    binding: 'Yes! Got svc databinding working',
    games: []
  };

  svc.changeBriefly = function () {
    var initialValue = svc.someData.binding;
    svc.someData.binding = 'Yeah svc was changed';

    $timeout(function () {
      svc.someData.binding = initialValue;
    }, 500);
  };

  svc.getGames = function () {
    return $http.get('http://188.166.30.252/gamesofweek/').then(
      function (response) {
        svc.someData.games = response.data;//.filter(game => game.competitionId == 296);
        svc.someData.games = svc.someData.games.slice(0, 50);
        angular.forEach(svc.someData.games, function (game) {
          game.homeTeam = game.name.split('-')[0].trim();
          game.awayTeam = game.name.split('-')[1].trim();
          if(game.sportId === '1'){
            svc.getTeamLogo(game.homeTeam).then(function (url) {
              game.homeCrest = url;
            });
            svc.getTeamLogo(game.awayTeam).then(function (url) {
              game.awayCrest = url;
            });
          }
        })
      });
  };

  svc.getTeamLogo = function (team) {
    return $http.get('http://api.football-data.org/v1/teams?name=' + team, {headers: {'X-Auth-Token': apikey}} ).then( function (response) {
      if(response.status === 200 && response.data.count > 0){
        return footballdataFactory.getTeam({
          id: response.data.teams[0].id,
          apiKey: apikey
        }).then(function (response) {
          return response.data.crestUrl;
        })
      }
    })
  };

});