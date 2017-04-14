'use strict';

app.controller("editDataController", ['$scope','$stateParams','editDataService','$rootScope','$state', function($scope, $stateParams, editDataService, $rootScope, $state){

    $scope.editBook = $stateParams.param1;

    console.log("selectedID: "+ JSON.stringify($scope.editBook));

    $scope.$on('bookSelectionChanged', function(event, args) {

        $scope.editBook = args;

        console.log("book obj set in EditController, if user presses edit, this ID will be edited " + args.ID);
    });

    $scope.editData = function() {
        // editBook data pass to service
        //service will pass that data to rest
        // rest will update and return status 0
        // brodcast even from here
        // maincontroler will catch it
        // from maincontroller go otherwise

        // console.log("editData: "+JSON.stringify($scope.editBook));
        editDataService.editData($scope.editBook).then(
            function(response){
                console.log("I am in edit response");
                var editObj = response.data;
                // edited book is saved
                // brod  $scope.editBook
                console.log(JSON.stringify(editObj));

                $rootScope.$broadcast("bookEdited", $scope.editBook);

            }, function(error){
                 console.log("error: "+error);
            })

    };

    $scope.closeEdit = function(){
        alert("You have cencelled edit book transaction.....");
        $state.go('otherwise');

    }


}]);