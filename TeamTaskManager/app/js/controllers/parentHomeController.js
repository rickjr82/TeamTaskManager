teamTaskManager.controller('parentHomeController', ['$scope', '$rootScope', '$location', 'logger', 'teamDetail',
    function ($scope, $rootScope, $location, logger, teamDetail) {
        function refreshView() {
            $scope.$apply();
        }
        $scope.userTeams = [];
        $scope.userPlayers = [];
        $scope.teamId = 0;
        if (typeof ($rootScope.currentUserId) == 'undefined') {
            teamDetail.getCurrentUserId().then(function (result) {
                $rootScope.currentUserId = result;
            });
        }
        if ($rootScope.parentTeamId >= 0) { $scope.teamId = $rootScope.parentTeamId; }       
        $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId });
            teamDetail.getCurrentUserDetails().then(function (result) {
                $scope.userTeams = result.teams;
                $scope.userPlayers = result.players;
                if ($scope.userTeams.length == 1) {
                    $scope.teamId = $scope.userTeams[0].id;
                }
            });
            $scope.manageUser = function () {
                $location.path('/manageUser/teams/');
            };
        $scope.signupForTasks = function() {
            $location.path('/taskSignUp/' + $rootScope.teamId+'/'+false);
        };
        $scope.selectCoach = function () {
            $location.path('/coachHome');
        };
    }]);