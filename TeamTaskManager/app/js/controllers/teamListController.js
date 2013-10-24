teamTaskManager.controller('teamListController', ['$scope', 'dataservice', 'logger', '$location',
function ($scope, dataservice, logger, $location) {
    $scope.teams = [];
    $scope.newTeamName = "";
    function refreshView() {
        $scope.$apply();
    }
    $scope.getTeams = function () {
        $scope.teams = [];
        dataservice.getEntities('Teams', $scope.teams, refreshView);
    };
    $scope.addTeam = function (newTeamName) {
        dataservice.addEntityToCollection('Team', [{ name: 'name', value: newTeamName }], $scope.teams, refreshView);
        $scope.newTeamName = "";
    };

    $scope.endEdit = function (entity) {
        dataservice.completeEntityEdit(entity, refreshView);
    }
    $scope.deleteTeam = function (team) {
        dataservice.deleteEntityFromCollection(team, $scope.teams, refreshView)
    };
    $scope.close = function () {
        $location.path('/coachHome');
    };
    $scope.getTeams();
}]);