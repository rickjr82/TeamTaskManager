teamTaskManager.controller('teamListController', ['$scope', 'dataservice', 'logger', '$location', 'teamDetail',
function ($scope, dataservice, logger, $location,teamDetail) {
    $scope.teams = [];
    $scope.newTeamName = "";
    if (typeof ($rootScope.currentUserId) !== 'undefined') {
        $scope.getTeams();
    }
    else{
        teamDetail.getCurrentUserId().then(function(result){
            $rootScope.currentUserId=result;
            $scope.getTeams();
        });
    }
    function refreshView() {
        $scope.$apply();
    }
    $scope.getTeams = function () {
        $scope.teams = [];
        dataservice.getEntities('Teams', $scope.teams, refreshView, [{ typeQ: 'where', first: 'coachId', second: 'eq', third: $rootScope.currentUserId }]);
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
   
}]);