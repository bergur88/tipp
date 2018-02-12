'use strict';

describe('module: main, controller: GamesCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var GamesCtrl;
  beforeEach(inject(function ($controller) {
    GamesCtrl = $controller('GamesCtrl');
  }));

  it('should do something', function () {
    expect(!!GamesCtrl).toBe(true);
  });

});
