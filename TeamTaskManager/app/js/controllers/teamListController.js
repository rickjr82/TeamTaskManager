teamTaskManager.controller('teamListController', ['$scope', '$rootScope', 'dataservice', 'logger', '$location', 'teamDetail',
function ($scope,$rootScope, dataservice, logger, $location,teamDetail) {
    $scope.teams = [];
    $scope.newTeamName = "";
    $scope.getTeams = function () {
        $scope.teams = [];
        dataservice.getEntities('Teams', $scope.teams, refreshView, [{ typeQ: 'where', first: 'coachId', second: 'eq', third: $rootScope.currentUserId }]);
    };
    if (typeof ($rootScope.currentUserId) !== 'undefined') {
        $scope.getTeams();
    }
    else{
        teamDetail.getCurrentUserId().then(function(result){
            $rootScope.currentUserId=result;
            $scope.getTeams();
        });
    }

    $scope.teamNameAlreadyExists = function (newTeamName, existingId) {
            var team = _.findWhere($scope.teams, { name: newTeamName });
      
        return typeof (team) !== 'undefined' && team.id !== existingId;
    };

    function refreshView() {
        $scope.$apply();
    }
   
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