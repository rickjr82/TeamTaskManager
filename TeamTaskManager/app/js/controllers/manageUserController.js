teamTaskManager.controller('manageUserController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.players = [];
        $scope.userTeams = [];
        $scope.userPlayers = [];
        $scope.selectedPlayerId = -1;
        $scope.teamId = 0;
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        dataservice.getEntities('Players', $scope.players, refreshView);
        teamDetail.getCurrentUserTeamsAndPlayers().then(function (result) {
            $scope.userTeams = result.teams;
            $scope.userPlayers = result.players;
        });
        $scope.addPlayer = function () {
            var newPlayer = _.findWhere($scope.players, { Id: $scope.selectedPlayerId });
            teamDetail.addPlayerToCurrentUser(newPlayer.Id).then(function () {
                $scope.userPlayers.push(newPlayer);
            });
        };
        $scope.removePlayer = function (player) {
            teamDetail.removePlayerFromCurrentUser(player.Id).then(function () {
                var index = $scope.userPlayers.indexOf(player);
                $scope.userPlayers.splice(index, 1);
            });
        };
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);