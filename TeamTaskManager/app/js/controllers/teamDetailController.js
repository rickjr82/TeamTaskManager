teamTaskManager.controller('teamDetailController', ['$scope', '$routeParams', 'dataservice',
            function ($scope, $routeParams, dataservice) {
                function refreshView() {
                    $scope.$apply();
                }
                $scope.init = function () {
                    $scope.currentPlayerId;
                    $scope.currentTaskId;
                    $scope.teamId = $routeParams.teamId;
                    $scope.players = [];
                    $scope.tasks = [];
                    $scope.teamPlayers = [];
                    $scope.teamTasks = [];

                    $scope.team = {};
                    
                     dataservice.getEntities('Players', $scope.players, refreshView);
                    dataservice.getEntities('Tasks', $scope.tasks, refreshView);
                    $scope.$watch($scope.team, function () {
                        if (typeof ($scope.team.id) !== 'undefined') {
                            $scope.teamPlayers = $scope.team.players();
                            $scope.teamTasks = $scope.team.tasks();
                        }
                    });
                    //dataservice.getEntities('Players', $scope.teamPlayers, refreshView, [{ typeQ: 'where', first: 'Team.Id', second: 'eq', third: $scope.teamId },{ typeQ: 'expand', first: 'Teams' }]);
                    //dataservice.getEntities('Tasks', $scope.teamTasks, refreshView, [{ typeQ: 'where', first: 'Team.Id', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first: 'Teams' }]);
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
                $scope.addPlayerToTeam = function (player) {
                    dataservice.getEntity('Team', $scope.teamId, $scope.team, refreshView);

                    dataservice.addEntityMapToJoinTable($scope.team, 'Players', player, $scope.teamPlayers, refreshView);
                };
                $scope.addTaskToTeam = function (task) {
                    dataservice.addEntityMapToJoinTable($scope.team, 'Tasks', task, $scope.teamTasks, refreshView);
                };

            }]);
