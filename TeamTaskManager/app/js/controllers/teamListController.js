teamTaskManager.controller('teamListController', ['$scope', 'dataservice', 'logger', '$location',
function ($scope, dataservice, logger, $location) {
    var removeItem = breeze.core.arrayRemoveItem;
    var suspendItemSave;
    $scope.teams = [];
    $scope.newTeamName = "";
    $scope.getTeams = function () {
        dataservice.getEntities('Teams')
            .then(querySucceeded)
            .fail(queryFailed);
    };
    $scope.addTeam = function (newTeamName) {
        var team = dataservice.createEntity(team);
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
            dataservice.extendItem(item);
            $scope.teams.push(item);
        });
        $scope.$apply();

        logger.info("Fetched Teams ");
    }
    function queryFailed(error) {
        logger.error(error.message, "Query failed");
    }
  
    $scope.endEdit = function (entity) {
        dataservice.saveEntity(entity).fin(refreshView);
    }
    $scope.deleteTeam = function (team) {
        removeItem($scope.teams, team);
        dataservice.deleteEntity(team)
            .fail(deleteFailed)
            .fin(refreshView);

        function deleteFailed() {
            $scope.teams.unshift(team);
        }
    };
    $scope.close = function () {
        $location.path('/admin');
    };
    $scope.getTeams();
}]);