teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location', 'teamDetail',
    function ($scope, $rootScope, $routeParams, dataservice, $location, teamDetail) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignments = [];
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignment = function (gameId, taskId) {
            return _.findWhere($scope.taskAssignments, { GameId: gameId, TaskId: taskId });
        };
        $scope.isAssigned = function (gameId, taskId) {
            if ($scope.taskAssignments.length == 0) {
                return false;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.PlayerId!==0;
        };

        $scope.teamId = $routeParams.teamId;
        $scope.getAssignedPerson = function (gameId, taskId) {
            if ($scope.taskAssignmentArray.length == 0) {
                return 'Loading';
            }
            var taskAssignment=$scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.DisplayName;
        };
        $scope.taskIsNotAbleToBeAssigned = function (gameId, taskId) {
            return false;
            if ($scope.taskAssignmentArray.length == 0) {
                return true;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.PlayerId !== $scope.currentPlayerId && taskAssignment.PlayerId !==null;
        };
        getDisplayName = function (taskAssignment) {
            if (taskAssignment.PlayerId == 0) {
                return 'None';
            } else {
                return taskAssignment.Player.FirstName + ' ' + taskAssignment.Player.LastName;
            }
        };        
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }], true);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }], true);
        teamDetail.getTaskAssignments($scope.teamId).then(function (results) {
            _.each(results, function (taskAssignment) {
                taskAssignment.DisplayName = getDisplayName(taskAssignment);
            });
            $scope.taskAssignments = results;
            
        });
        
        $scope.setTaskAssignment = function (gameId, taskId) {
            var localTask = $scope.findTaskAssignment(gameId, taskId);
            teamDetail.toggleTaskForCurrentPlayer(gameId, taskId).then(function (taskAssignmentFromDb) {
                taskAssignmentFromDb.DisplayName = getDisplayName(taskAssignment);
                localTask = taskAssignmentFromDb;
                $scope.$apply();
            });
            
        };
        
        $scope.close = function () {
            $location.path('/home');
        };
    }]);