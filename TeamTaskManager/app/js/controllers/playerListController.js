teamTaskManager.controller('playerListController', ['$scope', 'dataservice', 'logger', '$location',
function ($scope, dataservice, logger, $location) {
    $scope.players = [];
    $scope.newFirstName = "";
    $scope.newLastName = "";
    function refreshView() {
        $scope.$apply();
    }
    $scope.getPlayers = function () {
        $scope.players = [];
        dataservice.getEntities('Players', $scope.players, refreshView);
    };
    $scope.addPlayer = function (newFirstName, newLastName) {
        dataservice.addEntityToCollection('Player', [{ name: 'firstName', value: newFirstName }, { name: 'lastName', value: newLastName }], $scope.players, refreshView);
    };

    $scope.endEdit = function (player) {
        completeEntityEdit(player, refreshView);
    }
    $scope.deletePlayer = function (player) {
        dataservice.deleteEntityFromCollection(task, $scope.players, refreshView)
    };
    $scope.close = function () {
        $location.path('/admin');
    };
    $scope.getPlayers();
}]);