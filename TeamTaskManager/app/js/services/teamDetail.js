teamTaskManager.factory('teamDetail', ['$http', '$q',
            function ($http, $q) {
                return {
                    getCurrentUserPlayers: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/CurrentUserPlayers', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getCurrentUserTeams: function () {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/CurrentUserTeams').success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    addPlayerToCurrentUser: function (playerId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/AddPlayerToCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removePlayerFromCurrentUser: function (playerId) {
                        var deferred = $q.defer();
                        $http.delete('/api/teaminfo/DeletePlayerFromCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    addTeamToCurrentUser: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/AddTeamToCurrentUser', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removeTeamFromCurrentUser: function (teamId) {
                        var deferred = $q.defer();
                        $http.delete('/api/teaminfo/DeleteTeamFromCurrentUser', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    }


                };
            }]);
