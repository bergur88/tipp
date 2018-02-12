'use strict';
angular.module('main')
.controller('GamesCtrl', function ($log, Main, ISO3166) {

  $log.log('Hello from your Controller: GamesCtrl in module main:. This is your controller:', this);
  this.games = [];

  this.init = function () {
    var that = this;
    Main.getGames().then(function (games){
      that.games = Main.someData.games;
    });
  }

  this.mapCountryCode = function (code){
    if(code === 'ENG'){
      code = 'GB';
    }
    if(code === 'INT'){
      return 'International';
    }
    return ISO3166.getCountryName(code.substring(0,2));
  }

  this.getImage = function (teams, which) {
    var team = teams.split('-')[which].trim();
    return Main.getTeamLogo(team).then(function(url){
      return url;
    });
  }

  this.init();

});
