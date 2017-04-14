'use strict';

app.factory("tranDataService",['$http','$q', function($http, $q, $rootscope){

    function getTransactions() {
        var request = $http({
            url:"/restful/tran/gettrandata",
            method: "GET"
        });

        return sendRequest(request);
    };

    function sendRequest(config){

        var deferred = $q.defer();

        config.then(
            function(response){
                deferred.resolve(response);

            }, function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        getTransactions: getTransactions
    }

}]);