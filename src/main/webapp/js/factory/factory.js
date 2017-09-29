module.factory('Loading', function() {
	return {
		show: function(){
			angular.element('#backdrop-loading').show();
		},
		
		hide: function(){
			angular.element('#backdrop-loading').fadeOut();
		},
		isShow: function(){
			return angular.element('#backdrop-loading').css('display') != 'none';
		}
	}
});

module.factory('Toast', ['$mdToast', function($mdToast) {
	return {
		show: function(type, msg) {
		    $mdToast.show({
		        template: '<md-toast class="md-toast ' + type +'">' + msg + '</md-toast>',
		        hideDelay: 3000,
		        position: 'bottom left'
		    });
		}
	}
}]);

module.factory('Dialog', ['$mdDialog', '$mdMedia', '$timeout', function($mdDialog, $mdMedia, $timeout) {
	return {
		show: showDefault,
		confim: showConfirmationDialog,
		showDetails: showDetails,		
		cancelDialog : showCancelDialog,
		reconciliationDialog : showReconciliationDialog,
		onboarding : showOnboardingDialog
	}
	
	function showDefault(title, msg){
		var confirm = $mdDialog.alert()
			.title(title)
			.textContent(msg)
			.ariaLabel('Lucky day')				
			.ok('OK')			
			.clickOutsideToClose(true)
		$mdDialog.show(confirm);		
	}
	
	function showConfirmationDialog(title, msg){
		var useFullScreen = $mdMedia('xs');
		
		var confirm = $mdDialog.confirm()
	        .title(title)
	        .textContent(msg)
	        .ariaLabel('Lucky day')       
	        .ok('Prosseguir')	        
	        .cancel('Cancelar')
	        .clickOutsideToClose(true)
	        .fullscreen(useFullScreen);
		return $mdDialog.show(confirm);		
	}
	
	function showDetails(item, isContent){
		return $mdDialog.show({			    
		      controller: templateDialogController,
		      controllerAs: 'dtctrl',
		      templateUrl: 'view/resource-details-dialog.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose: true,
		      fullscreen: false	      
	    });	
		
		function templateDialogController($mdDialog){
			var vm = this;
			vm.i18n = autopeca.translation;
			
			vm.isContent = isContent;	
			vm.item = item;
			
			vm.hide = function() {
				$mdDialog.hide();
			};
			vm.cancel = function() {
				$mdDialog.cancel();
			};			
		}
	}
	
	function showOnboardingDialog(){
		var useFullScreen = $mdMedia('xs') || $mdMedia('sm');
		
		return $mdDialog.show({
			  controller: onboardingDialogController,
		      controllerAs: "obdctrl",
		      templateUrl: 'view/onboarding-dialog.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose: true,
		      fullscreen: useFullScreen	      
	    });
		
		function onboardingDialogController($mdDialog) {
			var vm = this;		
			vm.i18n = autopeca.translation;			
			vm.cancel = function() {
				$mdDialog.cancel();
			};				
		}
	}
	
	function showCancelDialog(ev, subscription){		
		var useFullScreen = $mdMedia('xs') || $mdMedia('sm');
		return $mdDialog.show({
		      controller: cancelDialogController,
		      controllerAs: "canctrl",
		      templateUrl: 'view/cancel-dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: useFullScreen	      
	    });
		
		function cancelDialogController($mdDialog) {
			var vm = this;		
			vm.i18n = autopeca.translation;
			vm.sub = subscription;
			
			vm.hide = function() {
				$mdDialog.hide();
			};
			
			vm.cancel = function() {
				$mdDialog.cancel();
			};
			
			vm.answer = function(motivo, form) {
				if (form.$valid){
					$mdDialog.hide(motivo);
				} else {
					form.$setSubmitted();
				}
			};		
		}
	}
	
	function showReconciliationDialog(ev){		
		var useFullScreen = $mdMedia('xs');
		return $mdDialog.show({
		      controller: reconciliationDialogController,
		      controllerAs: "recctrl",
		      templateUrl: 'view/reconciliation-dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose: true,
		      fullscreen: useFullScreen	      
	    });
		
		function reconciliationDialogController($mdDialog) {
			var vm = this;		
			vm.i18n = autopeca.translation;			
			
			vm.hide = function() {
				$mdDialog.hide();
			};
			
			vm.cancel = function() {
				$mdDialog.cancel();
			};
			
			vm.answer = function(emailPagamento, form) {
				if (form.$valid){
					$mdDialog.hide(emailPagamento);
				} else {
					form.$setSubmitted();
				}
			};		
		}
	}	
}]);