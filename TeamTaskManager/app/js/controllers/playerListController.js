teamTaskManager.controller('playerListController', ['$scope', 'teamDetail',
            function ($scope, teamDetail) {
                $scope.players = [];
                teamDetail.getPlayers().then(function (result) {
                    _.each(result, function (player) { player.isDirty = false; });

                    $scope.players = result;
                });
             
                $scope.addPlayer=function(){
                    $scope.players.unshift({firstName:'', lastName:'', id:0, isDirty:false});
                };                
                $scope.deletePlayer=function(player){
                    if (player.id!==0){
                        teamDetail.deletePlayer(player.id).then(function () {
                            var index= $scope.players.indexOf(player);
                            $scope.players.splice(index, 1);
                        });}
                    else{
                        var index= $scope.players.indexOf(player);
                        $scope.players.splice(index, 1);
                    }
                };
                $scope.markDirty = function (player) {
                    player.isDirty = true;
                };
                $scope.savePlayer = function (player) {
                    var existing = _.findWhere($scope.players, { firstName: player.firstName, lastName: player.lastName });
                    if (typeof (existing) !== 'undefined'){
                        if (existing.id !== player.id) {
                            player.firstName = '';
                            player.lastName = '';
                        }
                        else{
                            teamDetail.savePlayer(player).then(function (result) {
                                player.id = result.id;
                                player.isDirty = false;
                            });
                        }
                    }                   
    };
}]);
});