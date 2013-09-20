
teamTaskManager.controller('adminController', ['$scope', '$rootScope', '$location', 'dataservice', 'logger',
    function ($scope, $rootScope, $location, dataservice, logger) {
        $scope.teams = [];
        $scope.teamId = 0;
        logger.info("loading teams")
        dataservice.getTeams()
              .then(querySucceeded)
              .fail(queryFailed);
        $scope.modifyTeams = function () {
            $location.path('/teams');
        };
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
        $scope.modifyPlayers = function () {
            $location.path('/players');
        };
        $scope.signupForTasks = function () {
            $location.path('/signup/'+$scope.teamId);
        };
        $scope.manageTeam = function () {
            $location.path('/teamDetail/'+$scope.teamId);
        };
    }]);
