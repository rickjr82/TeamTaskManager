teamTaskManager.controller('manageUserController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.players = [];
        $scope.userTeams = [];
        $scope.userPlayers = [];
        $scope.teamId = 0;
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        dataservice.getEntities('Players', $scope.teams, refreshView);
        teamDetail.GetCurrentUserTeamsAndPlayers().then(function (result) {
            $scope.userTeams = result.teams;
            $scope.userTeams = result.players;
        }).fail(function (error) {
            logger.error(error.message);
        });
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);