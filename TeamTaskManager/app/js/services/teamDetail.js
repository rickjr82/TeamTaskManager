teamTaskManager.factory('teamDetail', ['$http', '$q',
            function ($http, $q) {
                return {
                    getTeamPlayers: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/GetTeamMembers', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getTeamTasks: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/GetTeamTasks', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getPlayers: function () {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/GetPlayers').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getTasks: function () {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/GetTasks').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getTeams: function () {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/GetTeams').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    saveTeam: function (team) {
                        var deferred = $q.defer();
                        $http.post('/api/TeamSearch/TeamDetails/PostTeamChanges', team).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    deleteTeam: function (id) {
                        var deferred = $q.defer();
                        $http.delete('/api/TeamSearch/TeamDetails/DeleteTeam', { params: { teamId: id } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },

                    savePlayer: function (player) {
                        var deferred = $q.defer();
                        $http.post('/api/TeamSearch/TeamDetails/PostPlayerChanges', player).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    deletePlayer: function (id) {
                        var deferred = $q.defer();
                        $http.delete('/api/TeamSearch/TeamDetails/DeletePlayer', { params: { playerId: id } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removePlayerFromTeam: function (playerId, teamId) {
                        var deferred = $q.defer();
                        $http.post('/api/TeamSearch/TeamDetails/DeletePlayerFromTeam', {params:{ playerId: playerId, teamId: teamId }}).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    }
,
                    addPlayerToTeam: function (playerId, teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/TeamSearch/TeamDetails/AddPlayerToTeam', { params: { playerId: playerId, teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    }

                    
                };
            }]);
