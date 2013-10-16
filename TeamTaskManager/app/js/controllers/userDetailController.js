teamTaskManager.controller('userDetailController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, dataservice, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.userTeams = [];
        $scope.userPlayers = [];
            teamDetail.getCurrentUserDetails().then(function (result) {
                $scope.userTeams = result.teams;
                $scope.userPlayers = result.players;
            });                  
    }]);