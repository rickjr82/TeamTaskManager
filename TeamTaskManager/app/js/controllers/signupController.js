teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location', 'teamDetail',
    function ($scope, $rootScope, $routeParams, dataservice, $location, teamDetail) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.players = [];
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignmentArray = [];
        $scope.taskAssignments = [];
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignment = function (gameId, taskId) {
           return  _.findWhere($scope.taskAssignmentArray, { GameId: gameId, TaskId: taskId });
        };
        $scope.isAssigned = function (gameId, taskId) {
            if ($scope.taskAssignmentArray.length == 0) {
                return false;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.DisplayName!=='None';
        };
        $scope.setTaskAssignments = function () {
            if ($scope.games.length > 0 && $scope.tasks.length > 0) {
                _.each($scope.games, function (game) {
                    _.each($scope.tasks, function (task) {
                        $scope.taskAssignmentArray.push({ GameId: game.Id, PlayerId: null, TaskId: task.Id, DisplayName:'None' });
                    });
                });
                if ($scope.taskAssignments.length > 0) {
                    _.each($scope.taskAssignments, function (taskAssignmentFromDb) {
                        var taskAssignment = $scope.findTaskAssignment(taskAssignmentFromDb.GameId, taskAssignmentFromDb.TaskId);
                        taskAssignment.PlayerId = taskAssignmentFromDb.PlayerId;
                        taskAssignment.DisplayName = taskAssignmentFromDb.Player.FirstName + ' ' + taskAssignmentFromDb.Player.LastName;
                    });
                    refreshView();
                }
            }
        };
        $scope.teamId = $routeParams.teamId;
        $scope.getAssignedPerson = function (gameId, taskId) {
            if ($scope.taskAssignmentArray.length == 0) {
                return 'None';
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

        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }], true, $scope.setTaskAssignments);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'TeamId', second: 'eq', third: $scope.teamId }], true, $scope.setTaskAssignments);
        dataservice.getEntities('TaskAssignments', $scope.taskAssignments, refreshView, [{ typeQ: 'where', first: 'Game.TeamId', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first: 'Player' }], true, $scope.setTaskAssignments);
        $scope.setTaskAssignment = function (gameId, taskId) {
            var localTask = $scope.findTaskAssignment(gameId, taskId);
            teamDetail.assignTaskToCurrentPlayer(gameId, taskId).then(function (taskAssignmentFromDb) {
                localTask = taskAssignmentFromDb;
                localTask.DisplayName = taskAssignmentFromDb.Player.FirstName + ' ' + taskAssignmentFromDb.Player.LastName;
            });
            $scope.$apply();
        };
        
        $scope.close = function () {
            $location.path('/home');
        };
    }]);