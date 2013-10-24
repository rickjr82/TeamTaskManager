teamTaskManager.controller('homeController', ['$scope', '$location', 'logger', 'teamDetail',
    function ($scope, $location, logger, teamDetail) {        
         $scope.selectCoach = function () {
            $location.path('/coachHome');
        };
        $scope.selectParent = function () {
            $location.path('/parentHome');
        };
        
    }]);