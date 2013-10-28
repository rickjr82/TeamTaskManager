
teamTaskManager.controller('coachHomeController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger','teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.teams = [];
        $scope.teamId = 0;        
        if ($rootScope.coachTeamId >= 0) { $scope.teamId = $rootScope.coachTeamId; }
       $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId });        
       dataservice.getEntities('Teams', $scope.teams, refreshView);
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
            $location.path('/taskSignUp/' + $rootScope.teamId + '/' + true);
        };
        $scope.close = function () {
            $location.path('/home');
        };
    }]);
