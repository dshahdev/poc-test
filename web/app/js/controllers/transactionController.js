'use strict';

app.controller('transactionController', ['$scope','$stateParams','$rootScope','tranDataService','$state', function($scope, $stateParams, $rootScope, tranDataService, $state){



    $scope.allBookTransData = {};
    $scope.TransForBook = {};
    $scope.selectedTranObj = null;
    $scope.idSelected = 0;

    function selectThisBook(book) {
        $scope.selectedBook = book;
    }

    $scope.$on('bookSelectionChanged', function(event, args) {

        $scope.selectedBook = args;

        $scope.changeActiveBook();

    });

    $scope.getTransBySelectedID = function() {

        selectThisBook($stateParams.param2);

        tranDataService.getTransactions().then(

            function(response) {

                var obj = response.data;

                $scope.allBookTransData = obj;

                $scope.changeActiveBook();

            }, function(error){

                console.log("error: "+error);
            })
    }

    $scope.changeActiveBook = function() {

        $scope.TransForBook = $scope.allBookTransData[$scope.selectedBook.ID];
        if ($scope.TransForBook.length > 0) {
            $scope.transClick($scope.TransForBook[0]);
        }

    }

    $scope.transClick = function(trans) {

        $scope.selectedTranObj = trans;
        $scope.idSelected = trans.ID;
    }

    $scope.updateTranList = function(obj, type) {

        if (type == "I") {
            if ($scope.allBookTransData[$scope.selectedBook.ID] != null) {
                $scope.allBookTransData[$scope.selectedBook.ID].push(obj);
            }
            else {
                $scope.allBookTransData[$scope.selectedBook.ID] = [obj];
            }
        }

        if (type == "R"){

            $scope.selectedTranObj.ReturnDate = obj.ReturnDate;
            $scope.selectedTranObj.Data[1] = obj.Data[1];
        }

        $scope.changeActiveBook();

    }

    $scope.notifyBookScreen = function(obj) {
        $rootScope.$broadcast('bookTransUpdated', obj);
    }


    function issueCheck() {

        return ( $scope.selectedBook != null) &&
                  ($scope.selectedBook.TotalBooks - $scope.selectedBook.BooksIssued) > 0;

    }

    function returnCheck() {
        return ($scope.selectedTranObj != null && $scope.selectedTranObj.ReturnDate == "");
    }

    $scope.doTransaction = function(type) {

        if ($scope.selectedTranObj == null) {
            alert('please select a transaction to return ');
            return;
        }


        var reqData = {};

        if (type == "I") {
            if (!issueCheck()) {
                alert('cannot issue books anymore, no available books');
                return;
            }
            reqData = {type: "I", bookObj: $scope.selectedBook};
        }
        if (type == "R") {
            if (!returnCheck()) {
                alert('book already returned or Issue row not selected, cannot return');
                return;
            }
            reqData = {type: "R", tranObj:$scope.selectedTranObj, bookObj:$scope.selectedBook};
        }

        tranDataService.doTransaction(reqData).then(

            function(response) {
                var obj = response.data
                $scope.updateTranList(obj.tranObj, reqData.type);
                $scope.notifyBookScreen(obj.bookObj);

            }, function(error) {
                console.log("error: " + error);
            });

    }

    $scope.closeTrans = function(){
        $state.go('otherwise')
    }

    $scope.getTransBySelectedID();

}])