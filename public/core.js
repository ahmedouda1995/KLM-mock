 var App = angular.module('HashFork', ['ui.bootstrap', 'ngRoute','angularMoment','angular-stripe']);

/**
 * Angular Routes
 */

// App.controller('ctrl',['$scope'], function($scope) {

//   $scope.user =
//     {name: '',
//     email: '',
//     tempEmail: '',
//     tempPass: ''};
// })
App.config(function($routeProvider,Stripe) {
    Stripe.setPublishableKey('pk_test_sQmJKmvytXUZo98BJ2eTVh7S');
    $routeProvider

        // route for the home page
        .when('/', {

            templateUrl : '/partials/landingPage.html',
            controller  : 'mainController'
        })
        .when('/confirmation',{
            templateUrl : '/partials/confirmation.html',
            controller  : 'confirmation'
        })
        .when('/payment', {
            templateUrl : '/partials/payment.html',
            controller  : 'paymentCtrl'
        })
         .when('/names', {
            templateUrl : '/partials/names.html',
            controller  : 'nCtrl'
        }).when('/returnflights', {
            templateUrl : '/partials/ReturnFlight.html',
            controller  : 'flightListCtrl'
        }).when('/outgoingflights', {
            templateUrl : '/partials/outgoingFlight.html',
            controller  : 'flightOutgoingCtrl'
        }).when('/ref',{
            templateUrl:'/partials/bookingreg.html',
            controller:'bookingCtrl'
        }).when('/bookings',{
            templateUrl:'/partials/bookings.html',
            controller:'bookingrefCtrl'
        }).when('/contact',{
            templateUrl:'/partials/contact.html'
        }).when('/about',{
            templateUrl:'/partials/aboutklm.html'
        }).when('/403',{
            templateUrl:'/partials/403.html'
        }).otherwise({
            templateUrl:'/partials/error.html'
        });
        
        
});
// App.config(function (stripeProvider) {
//     stripeProvider.setPublishableKey('pk_test_sQmJKmvytXUZo98BJ2eTVh7S');
//   });
