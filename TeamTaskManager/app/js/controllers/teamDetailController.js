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
                    
                    dataservice.getEntity('Teams', $scope.team, refreshView, [{ typeQ: 'where' }, { first: 'Id', second: 'eq', third: $scope.teamId }]);
                    dataservice.getEntities('Players', $scope.players, refreshView);
                    dataservice.getEntities('Tasks', $scope.tasks, refreshView);
                    dataservice.getEntities('Players', $scope.teamPlayers, refreshView, [{ typeQ: 'where' }, { first: 'Team.Id', second: 'eq', third: $scope.teamId },{ typeQ: 'expand', first: 'Team' }]);
                    dataservice.getEntities('Tasks', $scope.teamTasks, refreshView, [{ typeQ: 'where' }, { first: 'Team.Id', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first: 'Team' }]);
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
                    dataservice.addEntityMapToJoinTable($scope.team, 'Players', player, $scope.teamPlayers, refreshView);
                };
                $scope.addTaskToTeam = function (task) {
                    dataservice.addEntityMapToJoinTable($scope.team, 'Tasks', task, $scope.teamTasks, refreshView);
                };

            }]);
