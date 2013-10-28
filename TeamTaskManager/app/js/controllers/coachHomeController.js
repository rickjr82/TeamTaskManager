
teamTaskManager.controller('coachHomeController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.teamId = 0;        
        if ($rootScope.coachTeamId >= 0) { $scope.teamId = $rootScope.coachTeamId; }
        $scope.$watch('teamId', function () { $rootScope.coachTeamId = $scope.teamId });
        $scope.$watch('teams.length', function () {
            if ($scope.teams.length == 1) {
                $scope.teamId = $scope.teams[0].id;
            }
        });
        dataservice.getEntities('Teams', $scope.teams, refreshView, [{ typeQ: 'where', first: 'coachId', second: 'eq', third: $rootScope.currentUserId }]);
        $scope.modifyTeams = function () {
            $location.path('/teams');
        };
        $scope.modifyTasks = function () {
            $location.path('/tasks/' + $scope.teamId);
        };
        $scope.modifyPlayers = function () {
            $location.path('/players/' + $scope.teamId);
        };     
        $scope.manageGames = function () {
            $location.path('/games/' + $scope.teamId);
        };
        $scope.signupForTasks = function () {
            $location.path('/taskSignUp/' + $rootScope.coachTeamId + '/' + true);
        };
        $scope.close = function () {
            $location.path('/home');
        };
    }]);
