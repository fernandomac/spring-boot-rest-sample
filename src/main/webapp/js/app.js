'use strict';

var autopeca = {};

autopeca.url = window.location.origin;
autopeca.urlHost = autopeca.url + "/rest/";
autopeca.logo = '/image/fv-logo.png';
autopeca.contrato = '1.1';

autopeca.translation = {};
autopeca.select = {};
autopeca.login = {};
autopeca.emailcache = '';
autopeca.resultCache = {'type':'none','result' : []};
autopeca.report = "";

var module = angular.module('autopecaApp', ['ngMaterial','ngMessages', 'ngRoute', 'ngResource', 'ngSanitize', 'chart.js']);

module.config(['$routeProvider', function ($routeProvider) {
$routeProvider
	.when('/main', {
		templateUrl: '/view/main-view.html',
	    controller: 'MainCtrl',
	    controllerAs: 'mainctrl'
	})
	.when('/report', {
		templateUrl: '/view/report-view.html',
	    controller: 'ReportCtrl',
	    controllerAs: 'rptctrl'
	})
	.when('/customer/:customerid', {
    	templateUrl: '/view/customer-view.html',
        controller: 'CustomerCtrl',
        controllerAs: 'cusctrl'
    })
    .when('/user/:userid', {
    	templateUrl: '/view/user-view.html',
        controller: 'UserCtrl',
        controllerAs: 'userctrl'
    })
    .when('/search-customer', {
    	templateUrl: '/view/customer-search-view.html',
        controller: 'SearchCustomerCtrl',
        controllerAs: 'schcusctrl'
    })   
    .when('/purchase/:purchaseid', {
    	templateUrl: '/view/purchase-view.html',
        controller: 'PuchCtrl',
        controllerAs: 'puchctrl'
    })
    .when('/search-purchase', {
    	templateUrl: '/view/purchase-search-view.html',
        controller: 'SearchPuchCtrl',
        controllerAs: 'schpuctrl'
    })
    .when('/part/:partid', {
    	templateUrl: '/view/part-view.html',
        controller: 'PartCtrl',
        controllerAs: 'partctrl'
    })
    .when('/search-part', {
    	templateUrl: '/view/part-search-view.html',
        controller: 'SearchPartCtrl',
        controllerAs: 'schptctrl'
    })
    .when('/office', {
    	templateUrl: '/view/office-view.html',
    	controller: 'OfficeCtrl',
    	controllerAs: 'ofictrl'
    })
    .when('/onboarding', {
    	templateUrl: '/view/onboarding-view.html',
    	controller: 'OnboardingCtrl',
    	controllerAs: 'obctrl'
    })
    .when('/login/:action', {
    	templateUrl: '/view/login-view.html',
    	controller: 'LoginCtrl',
    	controllerAs: 'logctrl'
    })
    .when('/login/:action/:email/:code', {
    	templateUrl: '/view/login-view.html',
    	controller: 'LoginCtrl',
    	controllerAs: 'logctrl'
    })
    .when('/login', {
    	templateUrl: '/view/login-view.html',
    	controller: 'LoginCtrl',
    	controllerAs: 'logctrl'
    })
    .when('/chart', {
    	templateUrl: '/view/chart-view.html',
    	controller: 'ChartCtrl',
    	controllerAs: 'chtctrl'
    })
    .when('/master', {
    	templateUrl: '/view/master-view.html',
    	controller: 'MasterCtrl',
    	controllerAs: 'mstctrl'
    })
    .when('/subscription/:expired', {
    	templateUrl: '/view/subscription-view.html',
    	controller: 'SubscriptionCtrl',
    	controllerAs: 'subctrl'
    })
    .when('/subscription', {
    	redirectTo: '/subscription/1'    	
    })
    .when('/terms', {
    	templateUrl: '/view/terms-conditions-view.html'
    })
    .when('/privacy', {
    	templateUrl: '/view/terms-privacy.html'
    })
    .when('/aboutus', {
    	templateUrl: '/view/about-us.html'
    })
    .otherwise({
    	redirectTo: '/aboutus'
    });
}]);