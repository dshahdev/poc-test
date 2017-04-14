'use strict';

app.controller('transactionController', ['$scope','$stateParams','$rootScope','tranDataService', function($scope, $stateParams, rootScope, tranDataService){

    $scope.selectedBook = $stateParams.param2;

    $scope.bookTransData = {};
    $scope.currentTrans = {};
    $scope.idSelected = null;

    console.log("selectedID: "+ JSON.stringify($scope.selectedBook));

    $scope.$on('idSelected', function(event, args) {

        $scope.selectedBook = args;

        $scope.changeActiveBook();

        console.log("book obj set in TranController, " + $scope.selectedBook);
    });

    $scope.getTransBySelectedID = function() {
        tranDataService.getTransactions().then(

            function(response) {

                var obj = response.data;

                $scope.bookTransData = obj;

                $scope.changeActiveBook();

            }, function(error){

            })
    }

    $scope.changeActiveBook = function() {

        $scope.currentTrans = $scope.bookTransData[$scope.selectedBook.ID];
    }

    $scope.transClick = function(trans) {

        $scope.idSelected = trans.ID;
    }

    $scope.issueBook = function() {

        // check (totalBooks - issued book) > 0
        // if yes, add 1  to issuebook
        // change status to issued


    }

    $scope.getTransBySelectedID();

}])