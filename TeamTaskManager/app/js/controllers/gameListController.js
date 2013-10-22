﻿teamTaskManager.controller('gameListController', ['$scope', 'dataservice', 'logger', '$location', '$routeParams',
function ($scope, dataservice, logger, $location, $routeParams) {
    $scope.games = [];
    $scope.newDate = "";
    $scope.newOpponent = "";
    $scope.newLocation = "";
    $scope.dateTimePattern = /^\w\w$/;
    $scope.teamId = $routeParams.teamId;
    function refreshView() {
        $scope.$apply();
    }
    $scope.getGames = function () {
        $scope.games = [];
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }]);
    };
    $scope.addGame = function (newDate, newOpponent, newLocation) {
        var passed = dataservice.addEntityToCollection('Game', [{ name: 'Time', value: newDate }, { name: 'Opponent', value: newOpponent }, { name: 'Location', value: newLocation }, { name: 'TeamId', value: $scope.teamId }], $scope.games, refreshView);
    };

    $scope.endEdit = function (game) {
        dataservice.completeEntityEdit(game, refreshView);
    }
    $scope.deleteGame = function (game) {
        dataservice.deleteEntityFromCollection(game, $scope.games, refreshView)
    };
    $scope.close = function () {
        $location.path('/home');
    };
    $scope.getGames();
}]);