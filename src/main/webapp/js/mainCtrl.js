module.controller('MainCtrl', ['$scope', '$rootScope', '$mdSidenav', 'i18n', 'loginService', 'publicRelationService',
                               function($scope, $rootScope, $mdSidenav, i18n, loginService, publicRelationService) {	
	
	var vm = this;
	
	vm.openToggleLeft = buildToggler('left');
	vm.closeToggleLeft = closeToggler('left');
	
	vm.openToggleRight = buildToggler('right');
	vm.closeToggleRight = closeToggler('right');
	
	vm.back = historyBack;
	vm.logout = logout;
	vm.print = print;
	vm.goHome = goHome;
	vm.goHref = goHref;
	
	vm.sendContactMessage = sendContactMessage;
	
	angular.element(document).ready(function () {		
		vm.language = 'pt';
		vm.fblogged = true;
		vm.languages = i18n.availableLang($scope.i18n);
		vm.i18n = {};
		if (!autopeca.login.token) {
			loginService.getLogin().then(function(response) {		
				$rootScope.user = autopeca.login;
				$rootScope.user.avatarSrc = autopeca.login.logo;			
			},function(error) {				
				if (window.location.href.indexOf('/#/main') != -1){
					window.location.href = '/#/login';
				}
            });					
		 } else{
			$rootScope.user = autopeca.login;
			$rootScope.user.avatarSrc = autopeca.login.logo;
		 }
	});	
	
	
	$scope.$watch('mainctrl.language', function() {
		i18n.translateView(vm.language)
			.then(function(data){
					$scope.i18n = data;
					vm.i18n = data;
				});
		vm.languages = i18n.availableLang($scope.i18n);
	});

    function buildToggler(navID) {
	    return function() {
	    	$mdSidenav(navID).toggle();
	    };
    };
    
    function closeToggler(navID) {
	    return function() {
	    	$mdSidenav(navID).close();
	    };
    };
    
    function historyBack(){
    	window.history.back();
    }
    
    function logout(){
    	loginService.logout();
    }
    
    function goHome(){
    	window.location.href = '/#/main';
    }
    
    function goHref(href){    	
    	window.location.href = href;
    }
    
    function print(){ 
    	var printContents = document.getElementById("reportContentDiv").innerHTML;
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html><head><title>portalpecas.com.br</title></head><body onload="window.print()">' + printContents + '</body></html>');
		popupWin.document.close();
    }
    
    function sendContactMessage(form){
    	if(form.$valid){
    		publicRelationService.sendContactMessage(vm.contato).then(function(resp){
    			vm.contato = {};
    		});
		} else {
			form.$setSubmitted();			
		}    	
    }
}])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('blue-grey')
    	.primaryPalette('grey');

	$mdThemingProvider.theme('dark-orange')
	   .primaryPalette('cyan')	  
	   .dark();
	
	//red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
	    
});