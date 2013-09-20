teamTaskManager.controller('signupController', ['$scope', '$rootScope', '$routeParams', 'teamDetail', 
    function ($scope, $rootScope, $routeParams, teamDetail) {
        $scope.currentUser = { player: 'Nolan Wicker' };
        $scope.teams = [];
        $scope.teamId = 0;
        $scope.teamTasks = [{ name: 'task1', taskId: 0 }, { name: 'task2', taskId: 1 }];
        $scope.teamGames = [{ gameId: 0, date: '1/1/2013', opponent: 'opp1', location: 'field1' }, { gameId: 1, date: '1/7/2013', opponent: 'opp2', location: 'field2' }];
        $scope.gameTasks = [{ gameId: 0, taskId: 0, selectedBy: null }, { gameId: 0, taskId: 1, selectedBy: 'Nolan Wicker' }, { gameId: 1, taskId: 0, selectedBy: 'Ethan Walker' }, { gameId: 1, taskId: 1, selectedBy: 'Owen Wicker' }]

        teamDetail.getTeams().then(function (result) {
            $scope.teams = result;
        });
        $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId; });
    }]);