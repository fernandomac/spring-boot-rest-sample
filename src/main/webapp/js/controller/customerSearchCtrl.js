module.controller('SearchCustomerCtrl', ['Dialog', 'Toast', 'crudService', 'searchService', 
                               function(Dialog, Toast, crudService, searchService) {
	
	var vm = this;
	
	vm.search = searchCustomer;
	vm.clear = clearForm;
	vm.details = showDetails;
	vm.queryCidade = searchService.autocompleteCidade;
	
	angular.element(document).ready(function () {
		vm.i18n = autopeca.translation;
		
		vm.searchResult = searchService.getResultCache('cliente');
		vm.loaded = vm.searchResult.length != 0;		
	});
	
	function searchCustomer(){
		var filter = 'order=nome';
		
		if (vm.cliente){
			if (vm.cliente.nome){
				filter = '&nome=' + vm.cliente.nome;
			}
			
			if (vm.cliente.cadastroNacional){
				filter += '&cadastroNacional=' + vm.cliente.cadastroNacional;
			}
			
			if (vm.cliente.cidade){
				filter += '&cidade=' + vm.cliente.cidade.key;
			}
		}

		searchService.list('cliente', filter).then(function(response) {        	
			vm.searchResult = response.data;			
			searchService.setResultCache('cliente', response.data);	
			if (vm.searchResult.length == 0){
				Dialog.show(vm.i18n.msg_lbl_warning, vm.i18n.msg_search_not_found);
				vm.loaded = false;
			} else {
				vm.loaded = true;
			}
        });
	}	
	
	function clearForm(){
		vm.cliente = null;
		vm.loaded = false;
		vm.searchResult = [];
	}
	
	function showDetails(idx){
		var cli = vm.searchResult[idx];	
		Dialog.showDetails(cli, false);
	}
	
}]);