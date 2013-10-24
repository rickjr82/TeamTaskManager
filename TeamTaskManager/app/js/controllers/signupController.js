teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location', 'teamDetail',
    function ($scope, $rootScope, $routeParams, dataservice, $location, teamDetail) {        
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignments = [];
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignment = function (gameId, taskId) {
            return _.findWhere($scope.taskAssignments, { gameId: gameId, taskId: taskId });
        };
        $scope.isAssigned = function (gameId, taskId) {
            if ($scope.taskAssignments.length == 0) {
                return false;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.playerId!==0;
        };

        $scope.teamId = $routeParams.teamId;
        $scope.getAssignedPerson = function (gameId, taskId) {
            if ($scope.taskAssignments.length == 0) {
                return 'Loading';
            }
            var taskAssignment=$scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.displayName;
        };
        $scope.taskIsNotAbleToBeAssigned = function (gameId, taskId) {
            return false;
            if ($scope.taskAssignments.length == 0) {
                return true;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.playerId !== $scope.currentPlayerId && taskAssignment.playerId !==null;
        };
        getDisplayName = function (taskAssignment) {
            if (taskAssignment.playerId == 0) {
                return 'None';
            } else {
                return taskAssignment.displayName;
            }
        };        
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }], true);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }], true);
        teamDetail.getTaskAssignments($scope.teamId).then(function (results) {
            _.each(results, function (taskAssignment) {
                taskAssignment.displayName = getDisplayName(taskAssignment);
            });
            $scope.taskAssignments = results;
            
        });
        
        $scope.setTaskAssignment = function (gameId, taskId) {
            var localTask = $scope.findTaskAssignment(gameId, taskId);
            teamDetail.toggleTaskForCurrentPlayer(gameId, taskId).then(function (taskAssignmentFromDb) {
                taskAssignmentFromDb.displayName = getDisplayName(taskAssignmentFromDb);
                localTask.displayName = taskAssignmentFromDb.displayName;
                localTask.playerId = taskAssignmentFromDb.playerId;
                
               // $scope.$apply();
            });
            
        };
        
        $scope.close = function () {
            $location.path('/home');
        };
    }]);