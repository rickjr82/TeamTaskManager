
teamTaskManager.controller('gameListController', ['$scope', 'teamDetail', '$routeParams',
function ($scope, teamDetail, $routeParams) {
        $scope.teamGames = [];
        teamDetail.getTeamGames().then(function (result) {
            _.each(result, function (game) { game.isDirty = false; });

            $scope.teamGames = result;
        });

        $scope.addGame = function () {
            $scope.teamGames.unshift({ gameId: 0, date: '', location: '', opponent: '', isDirty: false });
        };
        $scope.deleteGame = function (player) {
            if (team.id !== 0) {
                teamDetail.deletePlayer(player.id).then(function () {
                    var index = $scope.players.indexOf(player);
                    $scope.players.splice(index, 1);
                });
            }
            else {
                var index = $scope.players.indexOf(player);
                $scope.players.splice(index, 1);
            }
        };
        $scope.markDirty = function (player) {
            player.isDirty = true;
        };
        $scope.savePlayer = function (player) {
            var existing = _.findWhere($scope.players, { firstName: player.firstName, lastName: player.lastName });
            if (typeof (existing) !== 'undefined') {
                if (existing.id !== player.id) {
                    player.firstName = '';
                    player.lastName = '';
                }
                else {
                    teamDetail.savePlayer(player).then(function (result) {
                        player.id = result.id;
                        player.isDirty = false;
                    });
                }
            }
        };
    }]);