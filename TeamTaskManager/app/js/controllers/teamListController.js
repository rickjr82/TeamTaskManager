teamTaskManager.controller('teamListController', ['$scope', 'dataservice', 'logger', '$location',
function ($scope, dataservice, logger, $location) {
    var removeItem = breeze.core.arrayRemoveItem;
    var suspendItemSave;
    $scope.teams = [];
    $scope.newTeamName = "";
    $scope.getTeams = function () {
        dataservice.getTeams()
            .then(querySucceeded)
            .fail(queryFailed);
    };
    $scope.addTeam = function (newTeamName) {
        var team = dataservice.createTeam();
        team.name = newTeamName;
        dataservice.saveEntity(team)
            .then(addSucceeded)
            .fail(addFailed)
            .fin(refreshView);

        function addSucceeded() {
            $scope.teams.unshift(team);
        }

        function addFailed(error) {
            failed({ message: "Save of new team failed" });
        }
    };
    function refreshView() {
        $scope.$apply();
    }
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
    $scope.endEdit = function (entity) {
        dataservice.saveEntity(entity).fin(refreshView);
    }
    $scope.deleteTeam = function (team) {
        removeItem($scope.teams, team);
        dataservice.deleteTeam(team)
            .fail(deleteFailed)
            .fin(refreshView);

        function deleteFailed() {
            $scope.teams.unshift(team);
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
        $location.path('/admin');
    };
    $scope.getTeams();
}]);