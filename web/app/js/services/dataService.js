'use strict';

app.factory("dataService",['$http','$q', function($http, $q, $rootscope){

    function getBooksData() {
        var request = $http({
            url:"/restful/persistence/getbookdata",
            method: "GET",
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
        getBooksData: getBooksData
    }

}])