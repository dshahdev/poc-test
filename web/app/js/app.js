'use strict';

var app = angular.module("app", ['ui.router']);

app.config(['$stateProvider', function($stateProvider,$urlRouter){

    $stateProvider

    .state('add',{
        url: '/add',
        templateUrl: 'partials/addData.html',
        controller: 'addDataController'
    })

    .state('edit',{
        url: '/edit',
        params: { param1: null},
        templateUrl: 'partials/editData.html',
        controller: 'editDataController'
    })

    .state('delete',{
        url: '/delete',
        templateUrl: 'partials/deleteData.html',
        controller: 'deleteDataController'
    })

    .state('transactions',{
        url: '/transactions',
        params: { param2: null},
        templateUrl: 'partials/transactionData.html',
        controller: 'transactionController'
    })

    .state('otherwise',{
        url:'/'
    })

}])