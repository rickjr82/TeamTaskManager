teamTaskManager.factory('teamDetail', ['$http', '$q',
            function ($http, $q) {
                return {
                    getCurrentUserPlayers: function (teamId, inCoachMode) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/CurrentUserPlayers', { params: { teamId: teamId, inCoachMode: inCoachMode } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getCurrentUserId: function() {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/GetCurrentUserId').success(function(data) {
                            deferred.resolve(data);
                        }).error(function(error) {
                            deferred.reject();
                        });
                        return deferred
                    },
                    getCurrentUserTeams: function (inCoachMode) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/CurrentUserTeams', { params: { inCoachMode: inCoachMode } }).success(function (data) {
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
                    },
                    getCurrentUserDetails: function () {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/GetCurrentUserDetails').success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getTaskAssignments: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/GetTaskAssignments', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },                    
                    toggleTaskForCurrentPlayer: function (gameId, taskId, playerId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfo/ToggleTaskForCurrentPlayer', { params: { gameId: gameId, taskId: taskId, playerId:playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (error) {
                            deferred.reject();
                        });
                        return deferred.promise;
                    }
                };
            }]);
