teamTaskManager.controller('teamListController', ['$scope', 'dataservice', '$modalInstance', 'logger',
            function ($scope, dataservice, $modalInstance, logger) {
                var removeItem = breeze.core.arrayRemoveItem;
                var suspendItemSave;
                $scope.teams = [];
                $scope.getTeams = function () {
                    dataservice.getTeams()
                        .then(querySucceeded)
                        .fail(queryFailed);
                };
                $scope.addTeam = function () {
                    $scope.teams.unshift({ name: 'test', id: 0 });
                    var item = dataservice.createTeam({
                        name: $scope.newTeamName,
                        id: 0
                    });

                    dataservice.saveChanges().fail(addFailed);
                    $scope.teams.unshift(item);
                    extendItem(item);
                    $scope.items.push(item);
                    $scope.newTodo = "";

                    function addFailed() {
                        removeItem($scope.items, item);
                        $scope.apply();
                    }
                };
                function querySucceeded(data) {
                    $scope.teams = [];
                    data.results.forEach(function (item) {
                        extendItem(item);
                        $scope.teams.push(item);
                    });
                    $scope.$apply();

                    logger.info("Fetched Teams ");
                }
                function queryFailed(error) {
                    logger.error(error.message, "Query failed");
                }
                function extendItem(item) {
                    if (item.isEditing !== undefined) return; // already extended

                    item.isEditing = false;

                    // listen for changes with Breeze PropertyChanged event
                    item.entityAspect.propertyChanged.subscribe(function () {
                        if (item.isEditing || suspendItemSave) { return; }
                        // give EntityManager time to hear the change
                        setTimeout(function () { saveIfModified(item); }, 0);
                    });
                }
                function saveIfModified(item) {
                    if (item.entityAspect.entityState.isModified()) {
                        dataservice.saveChanges();
                    }
                }

                $scope.deleteTeam = function (team) {
                    if (team.id !== 0) {
                        datacontext.deleteTeam(team.id).then(function () {
                            var index = $scope.teams.indexOf(team);
                            $scope.teams.splice(index, 1);
                        });
                    }
                    else {
                        var index = $scope.teams.indexOf(team);
                        $scope.teams.splice(index, 1);
                    }
                };

                $scope.saveTeam = function (team) {
                    var existing = _.findWhere($scope.teams, { name: team.name });
                    if (typeof (existing) !== 'undefined') {
                        if (existing.id !== team.id) {
                            alert('Existing Name')
                            team.name = '';
                        }
                        else {
                            teamDetail.saveTeam(team).then(function (result) {
                                team.id = result.id;
                            });
                        }
                    }
                };
                $scope.close = function () {
                    $modalInstance.close($scope.teams);
                };
                $scope.getTeams();
            }]);