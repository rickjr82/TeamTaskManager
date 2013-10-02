teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location',
    function ($scope, $rootScope, $routeParams, dataservice, $location) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.players = [];
        $scope.tasks = [];
        $scope.games = [];
        $scope.taskAssignments = {games:[] };
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignmentRecord= function(gameId, taskId) {
            var game = _.findWhere($scope.taskAssignments.games, { gameId: gameId });
            var gameTask = _.findWhere(game.tasks, { taskId: taskId });
            return taskAssignment;
        };
        $scope.teamId = $routeParams.teamId;
        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }],true,setTaskAssignments);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }], true, setTaskAssignments);
        dataservice.getEntities('TaskAssignments', $scope.taskAssignments, refreshView, [{ typeQ: 'where', first: 'Game.TeamId', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first:'Game' }], true, setTaskAssignments);
        $scope.setTaskAssignments = function () {
            if ($scope.games.length > 0 && $scope.tasks.length>0) {
                $scope.taskAssignments.games = [];
                _.each($scope.games, function (game) {
                    var newGame={ gameId: game.id, tasks:[] };
                    _.each($scope.tasks, function(task){
                        newGame.tasks.append({taskId: task.id});
                    });
                    $scope.taskAssignments.games.push();
                });
                if ($scope.taskAssignments.length > 0)
                {
                    _.each($scope.taskAssignments, function (taskAssignment) {
                        var localTask = $scope.findTaskAssignmentRecord(taskAssignment.gameId, taskAssignment.taskId);
                        localTask.playerId = taskAssignment.playerId;
                    });
                }
            }
        };
        $scope.close = function () {
            $location.path('/admin');
        };
    }]);