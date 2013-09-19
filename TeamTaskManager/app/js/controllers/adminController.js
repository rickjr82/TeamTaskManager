
teamTaskManager.controller('adminController', ['$scope', '$rootScope', '$modal', 'dataservice', 'logger',
    function ($scope, $rootScope, $modal, dataservice, logger) {
        $scope.teams = [];
        $scope.teamId = 0;
        logger.info("loading teams")
        dataservice.getTeams()
              .then(querySucceeded)
              .fail(queryFailed);
        $scope.$watch('teamId', function () { $rootScope.teamId = $scope.teamId; });
        $scope.modifyTeams = function () {
            var opts = { backdrop: true, keyboard: true, backdropClick: false, templateUrl: '/app/html/partials/teamList.html', controller: 'teamListController' };
            var modalInstance = $modal.open(opts);
            modalInstance.result.then(function (result) {
                $scope.teamId = 0;
                $scope.teams = result;
            });
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
            var opts = { backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/playerList.html', controller: 'playerListController' };
            $modal.open(opts);
        };
        $scope.signupForTasks = function () {
            var opts = {
                backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/signup.html', controller: 'signupController'
            };
            $modal.open(opts);
        };
        $scope.manageTeam = function () {
            var opts = {
                backdrop: true, keyboard: true, backdropClick: true, templateUrl: '/app/html/partials/teamDetail.html', controller: 'teamDetailController'
            };
            $modal.open(opts);
        };
    }]);
