teamTaskManager.controller('userTeamListController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.userTeams = [];
        $scope.selectedTeamId = 0;
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        teamDetail.getCurrentUserTeams().then(function (result) {
            $scope.userTeams = result;
         });
        $scope.addTeam = function () {
            var newTeam = _.findWhere($scope.teams, { Id: $scope.selectedTeamId });
            teamDetail.addTeamToCurrentUser(newTeam.Id).then(function () {
                $scope.userTeams.push(newTeam);
            });
        };
        $scope.removeTeam = function (team) {
            teamDetail.removeTeamFromCurrentUser(team.Id).then(function () {
                var index = $scope.userTeams.indexOf(team);
                $scope.userTeams.splice(index, 1);
            });
        };
        $scope.selectPlayers = function (teamId) {
            $location.path('/manageUser/players/'+teamId);
        };
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);