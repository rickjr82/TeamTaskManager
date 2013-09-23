
teamTaskManager.controller('adminController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger',
    function ($scope, $rootScope, $location, dataservice, logger) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.teamId = 0;
        logger.info("loading teams")
        dataservice.getEntities('Teams', $scope.teams, refreshView);
        $scope.modifyTeams = function () {
            $location.path('/teams');
        }; $scope.modifyTasks = function () {
            $location.path('/tasks');
        };
        $scope.modifyPlayers = function () {
            $location.path('/players');
        };
        $scope.signupForTasks = function () {
            $location.path('/signup/'+$scope.teamId);
        };
        $scope.manageTeam = function () {
            $location.path('/teamDetail/'+$scope.teamId);
        };

    }]);
