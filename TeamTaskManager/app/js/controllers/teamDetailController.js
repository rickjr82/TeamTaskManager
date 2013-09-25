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
                
                    $scope.team = {tasks:[], players:[]};
                     dataservice.getEntities('Players', $scope.players, refreshView);
                     dataservice.getEntities('Tasks', $scope.tasks, refreshView);
                     dataservice.getEntity('Teams', [{ typeQ: 'where', first: 'id', second: 'eq', third: $scope.teamId }, { typeQ: 'expand', first: 'Players, Tasks' }]).then(function (result) {
                         $scope.team = result.results[0];
                         refreshView();
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
                    var player = _.findWhere($scope.players, { id: $scope.currentPlayerId });
                    dataservice.addExistingEntityToCollection($scope.team.players, player, refreshView);                    
                };
                $scope.addTaskToTeam = function () {
                    var task = _.findWhere($scope.tasks, { id: $scope.currentTaskId });
                    dataservice.addExistingEntityToCollection($scope.team.tasks, task, refreshView);
                };

            }]);
