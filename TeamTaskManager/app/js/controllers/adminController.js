
teamTaskManager.controller('adminController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger',
    function ($scope, $rootScope, $location, dataservice, logger) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.teamId = 0;
        if ($rootScope.teamId >= 0) { $scope.teamId = $rootScope.teamId;}
        else { $rootScope.teamId = -1;}
        $scope.$watch('teamId', function () { $rootScope.teamId=$scope.teamId });
        logger.info("loading teams")
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        $scope.modifyTeams = function () {
            $location.path('/teams');
        };

        $scope.modifyTasks = function () {
            $location.path('/tasks' + $scope.teamId);
        };
        $scope.modifyPlayers = function () {
            $location.path('/players' + $scope.teamId);
        };
        $scope.signupForTasks = function () {
            $location.path('/signup/'+$scope.teamId);
        };
        $scope.manageGames = function () {
            $location.path('/games/' + $scope.teamId);
        };
        $scope.manageTeam = function () {
            $location.path('/teamDetail/'+$scope.teamId);
        };

    }]);
