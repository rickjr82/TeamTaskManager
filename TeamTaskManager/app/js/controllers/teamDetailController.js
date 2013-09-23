teamTaskManager.controller('teamDetailController', ['$scope', '$routeParams', 'dataservice',
            function ($scope, $routeParams, dataservice) {
                $scope.init = function () {
                    $scope.currentPlayerId;
                    $scope.currentTaskId;
                    $scope.teamId = $routeParams.teamId;
                    $scope.players = [];
                    $scope.teamPlayers = [];
                    teamDetail.getPlayers().then(function (result) {
                        _.each(result, function (player) { player.formattedName = player.lastName + ', ' + player.firstName });
                        $scope.players = result;
                    });
                    teamDetail.getTasks().then(function (result) {
                        $scope.tasks = result;
                    });
                    teamDetail.getTeamPlayers($scope.teamId).then(function (result) {
                        $scope.teamPlayers = result;
                    });
                    teamDetail.getTeamTasks($scope.teamId).then(function (result) {
                        $scope.teamTasks = result;
                    });
                    $scope.teamPlayerColumns = [
                        { label: 'First', map: 'firstName' },
                        { label: 'Last', map: 'lastName' }
                    ];
                    $scope.teamTaskColumns = [
                        { label: 'Task', map: 'name' },
                        { label: 'Description', map: 'description' }
                    ];
                };
                $scope.init();
                $scope.addPlayerToTeam = function () {
                    teamDetail.addPlayerToTeam($scope.currentPlayerId, $scope.teamId).then(function () {
                        var player = _.findWhere($scope.players, { id: $scope.currentPlayerId });
                        $scope.teamPlayers.unshift(player);
                    });
                };
                $scope.addTaskToTeam = function () {
                    teamDetail.addTaskToTeam($scope.currentTaskId, $scope.teamId).then(function () {
                        var task = _.findWhere($scope.tasks, { id: $scope.currentTaskId });
                        $scope.teamTasks.unshift(task);
                    });
                };

            }]);
