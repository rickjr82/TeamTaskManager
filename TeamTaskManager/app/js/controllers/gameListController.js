teamTaskManager.controller('gameListController', ['$scope', 'dataservice', 'logger', '$location', '$routeParams',
function ($scope, dataservice, logger, $location, $routeParams) {
    $scope.games = [];
    $scope.newDate = "";
    $scope.newOpponent = "";
    $scope.newLocation = "";
    $scope.teamId = $routeParams.teamId;
    function refreshView() {
        $scope.$apply();
    }
    $scope.getGames = function () {
        $scope.games = [];
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
    };
    $scope.addGame = function (newDate, newOpponent, newLocation) {
        var passed=dataservice.addEntityToCollection('Game', [{ name: 'date', value: newDate }, { name: 'opponent', value: newOpponent }, { name: 'location', value: newLocation }, { name: 'teamId', value: $scope.teamId }], $scope.games, refreshView);
    };

    $scope.endEdit = function (game) {
        dataservice.completeEntityEdit(game, refreshView);
    }
    $scope.deleteGame = function (game) {
        dataservice.deleteEntityFromCollection(game, $scope.games, refreshView)
    };
    $scope.close = function () {
        $location.path('/admin');
    };
    $scope.getGames();
}]);