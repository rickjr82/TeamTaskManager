teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'dataservice', '$location',
    function ($scope, $rootScope, $routeParams, dataservice, $location) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.players = [];
        $scope.tasks = [];
        $scope.games = [];
        $scope.currentPlayerId = $rootScope.currentPlayerId;
        function refreshView() {
            $scope.$apply();
        }
        $scope.findTaskAssignmentRecord= function(gameId, taskId) {
            var taskAssignment=_.findWhere($scope.taskAssignments, {gameId:gameId, taskId:taskId});
            return taskAssignment;
        };
        $scope.teamId = $routeParams.teamId;
        dataservice.getEntities('Players', $scope.players, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('Games', $scope.games, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
        dataservice.getEntities('TaskAssignments', $scope.taskAssignments, refreshView, [{ typeQ: 'where', first: 'Game.TeamId', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first:'Game' }]);

        $scope.close = function () {
            $location.path('/admin');
        };
    }]);