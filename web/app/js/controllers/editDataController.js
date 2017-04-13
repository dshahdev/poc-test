'use strict';

app.controller("editDataController", ['$scope','$stateParams', function($scope, $stateParams){

    $scope.editBook = $stateParams.param1;

    console.log("selectedID: "+ JSON.stringify($scope.editBook));

    $scope.$on('idSelected', function(event, args) {

        $scope.editBook = args;

        console.log("book obj set in EditController, if user presses edit, this ID will be edited " + args.ID);
    });

    $scope.editData = function() {

    }
}]);