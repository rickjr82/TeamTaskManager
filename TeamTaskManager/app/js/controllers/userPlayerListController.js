teamTaskManager.controller('userPlayerListController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail', '$routeParams',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail, $routeParams) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teamId = $routeParams.teamId;
        $scope.players = [];
        $scope.userPlayers = [];
        $scope.selectedPlayerId = -1;
        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        teamDetail.getCurrentUserPlayers($scope.teamId).then(function (result) {            
            $scope.userPlayers = result;
        });
        $scope.addPlayer = function () {
            var newPlayer = _.findWhere($scope.players, { id: $scope.selectedPlayerId });
            teamDetail.addPlayerToCurrentUser(newPlayer.id).then(function () {
                $scope.userPlayers.push(newPlayer);
            });
        };
        $scope.removePlayer = function (player) {
            teamDetail.removePlayerFromCurrentUser(player.id).then(function () {
                var index = $scope.userPlayers.indexOf(player);
                $scope.userPlayers.splice(index, 1);
            });
        };
        $scope.close = function () {
            $location.path('/manageUser/teams');
        };
    }]);