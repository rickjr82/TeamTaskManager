teamTaskManager.controller('manageUserController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.players = [];
        $scope.userTeams = [];
        $scope.userPlayers = [];
        $scope.selectedPlayerId = 0;
        $scope.teamId = 0;
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        dataservice.getEntities('Players', $scope.players, refreshView);
        teamDetail.getCurrentUserTeamsAndPlayers().then(function (result) {
            $scope.userTeams = result.teams;
            $scope.userPlayers = result.players;
        });
        $scope.addPlayer = function () {
            var newPlayer = _.findWhere($scope.players, { playerId: $scope.selectedPlayerId })
            $scope.userPlayers.push(newPlayer);
        };
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);