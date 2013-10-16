teamTaskManager.controller('playerListController', ['$scope', 'dataservice', 'logger', '$location', '$routeParams',
function ($scope, dataservice, logger, $location, $routeParams) {
    $scope.players = [];
    $scope.newFirstName = "";
    $scope.newLastName = "";
    $scope.teamId = $routeParams.teamId;
    function refreshView() {
        $scope.$apply();
    }
    $scope.getPlayers = function () {
        $scope.players = [];
        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }]);
    };
    $scope.addPlayer = function (newFirstName, newLastName) {
        dataservice.addEntityToCollection('Player', [{ name: 'FirstName', value: newFirstName }, { name: 'LastName', value: newLastName }, { name: 'TeamId', value: $scope.teamId }], $scope.players, refreshView);
    };

    $scope.endEdit = function (player) {
        dataservice.completeEntityEdit(player, refreshView);
    }
    $scope.deletePlayer = function (player) {
        dataservice.deleteEntityFromCollection(player, $scope.players, refreshView)
    };
    $scope.close = function () {
        $location.path('/home');
    };
    $scope.getPlayers();
}]);