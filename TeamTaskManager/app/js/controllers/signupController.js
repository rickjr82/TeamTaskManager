﻿teamTaskManager.controller('signupController', ['$scope', '$routeParams', 'dataservice', '$location', 'teamDetail',
    function ($scope, $routeParams, dataservice, $location, teamDetail) {        
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignments = [];
        $scope.userPlayersOnTeam = [];
        $scope.teamId = $routeParams.teamId;
        $scope.selectedPlayerId = -1;
        $scope.inCoachMode = ($routeParams.inCoachMode=="true");
        
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignment = function (gameId, taskId) {
            return _.findWhere($scope.taskAssignments, { gameId: gameId, taskId: taskId });
        };
        $scope.alreadyCompleted = function (task) {          
            var date = new Date(task.gameTime);
            return Date.now() > date;
        };
        $scope.isAssigned = function (gameId, taskId) {
            if ($scope.taskAssignments.length == 0) {
                return false;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.playerId!==0;
        };

        $scope.getAssignedPerson = function (gameId, taskId) {
            if ($scope.taskAssignments.length == 0) {
                return 'Loading...';
            }
            var taskAssignment=$scope.findTaskAssignment(gameId, taskId);
            return taskAssignment.displayName;
        };
        $scope.isAbleToBeAssigned = function (gameId, taskId) {         
            if ($scope.taskAssignments.length == 0) {
                return false;
            }
            var taskAssignment = $scope.findTaskAssignment(gameId, taskId);
            
            if ($scope.alreadyCompleted(taskAssignment)) {
                return false;
            }
            if ($scope.inCoachMode) {
                return taskAssignment.playerId !== 0 || $scope.selectedPlayerId > 0;
            } else {
                if (taskAssignment.playerId == 0 && $scope.selectedPlayerId>0) {
                    return true;
                } else {
                    if (taskAssignment.playerId > 0) {
                        return isOwnedByCurrentUser(taskAssignment.playerId);
                    } else {
                        return $scope.selectedPlayerId > 0;
                    }
                }
            }
            
            return taskAssignment.playerId !== $scope.currentPlayerId && taskAssignment.playerId !==null;
        };
        isOwnedByCurrentUser = function(playerId) {
            var player = _.findWhere($scope.userPlayersOnTeam, { id: playerId });
            return typeof(player) !== 'undefined';
        };
        getDisplayName = function (taskAssignment) {
            if (taskAssignment.playerId == 0) {
                return 'Open';
            } else {
                return taskAssignment.displayName;
            }
        };
        teamDetail.getCurrentUserPlayers($scope.teamId, $scope.inCoachMode).then(function (result) {
            $scope.userPlayersOnTeam = result;
            if ($scope.inCoachMode) {
                $scope.selectedPlayerId = -1;
            } else {
                $scope.selectedPlayerId = $scope.userPlayersOnTeam[0].id;
            }
        });
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
            teamDetail.toggleTaskForCurrentPlayer(gameId, taskId, $scope.selectedPlayerId).then(function (taskAssignmentFromDb) {
                taskAssignmentFromDb.displayName = getDisplayName(taskAssignmentFromDb);
                localTask.displayName = taskAssignmentFromDb.displayName;
                localTask.playerId = taskAssignmentFromDb.playerId;
                
               // $scope.$apply();
            });
            
        };
        
        $scope.close = function () {
            if ($scope.inCoachMode) {
                $location.path('/coachHome');
            } else {
                $location.path('/parentHome');
            }
        };
    }]);