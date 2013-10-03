teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location',
    function ($scope, $rootScope, $routeParams, dataservice, $location) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.players = [];
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignmentArray = [];
        $scope.taskAssignments = [];
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        $scope.currentPlayerId = 7;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignment = function (gameId, taskId) {
           return  _.findWhere($scope.taskAssignmentArray, { gameId: gameId, taskId: taskId });
        };
        $scope.setTaskAssignments = function () {
            if ($scope.games.length > 0 && $scope.tasks.length > 0) {
                _.each($scope.games, function (game) {
                    _.each($scope.tasks, function (task) {
                        $scope.taskAssignmentArray.push({ gameId:game.id, playerId: null, taskId:task.id });
                    });
                });
                if ($scope.taskAssignments.length > 0) {
                    _.each($scope.taskAssignments, function (taskAssignmentFromDb) {
                        var taskAssignment = $scope.findTaskAssignment(taskAssignmentFromDb.gameId, taskAssignmentFromDb.taskId);
                        taskAssignment.playerId = taskAssignmentFromDb.playerId;
                    });
                    refreshView();
                }
            }
        };
        $scope.teamId = $routeParams.teamId;
        $scope.taskIsAssigned = function (gameId, taskId) {
            if ($scope.taskAssignmentArray.length == 0) {
                return false;
            }
            var taskAssignment=$scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.playerId !== null;
        };
        $scope.taskIsNotAbleToBeAssigned = function (gameId, taskId) {
            if ($scope.taskAssignmentArray.length == 0) {
                return true;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.playerId !== $scope.currentPlayerId && taskAssignment.playerId !==null;
        };

        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }],true,$scope.setTaskAssignments);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }], true, $scope.setTaskAssignments);
        dataservice.getEntities('TaskAssignments', $scope.taskAssignments, refreshView, [{ typeQ: 'where', first: 'game.teamId', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first: 'Game' }], true, $scope.setTaskAssignments);
        $scope.setTaskAssignment = function (gameId, taskId) {
            var localTask = $scope.findTaskAssignment(gameId, taskId);
            if (localTask.playerId == $scope.currentPlayerId) {
                localTask.playerId = null;
            }
            else {
                localTask.playerId = $scope.currentPlayerId
            }
            
        };
        
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);