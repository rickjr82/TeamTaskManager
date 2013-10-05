teamTaskManager.factory('teamDetail', ['$http', '$q',
            function ($http, $q) {
                return {
                    getCurrentUserTeamsAndPlayers: function () {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/GetCurrentUserTeamsAndPlayers').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    addPlayerToCurrentUser: function (playerId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/AddPlayerToCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removePlayerFromCurrentUser: function (playerId) {
                    var deferred = $q.defer();
                        $http.delete('/api/teaminfo/DeletePlayerFromCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                }

                    
                };
            }]);
