module.controller('CustomerCtrl', ['Dialog', 'Toast', 'crudService', 'searchService', '$routeParams', 
                         function(Dialog, Toast, crudService, searchService, $routeParams) {
	
	var vm = this;
	
	vm.save = saveCustomer;	
	vm.searchCep = searchAddress;
	vm.clear = clearForm;
	vm.deactivate = deactivateCustomer;
	vm.activate = activateCustomer;
	vm.queryCidade = searchService.autocompleteCidade;
		
	angular.element(document).ready(function () {		
		vm.id = $routeParams.customerid;	
		vm.update = vm.id > 0;
		vm.i18n = autopeca.translation;
		vm.tipoEntidade = autopeca.tipoEntidade;		
		
		if (vm.update){	findCustomer() };		
	});
	
	function saveCustomer(form){
		if(form.$valid){
			if (vm.id > 0){
				editCustomer();
			} else {
				createNewCustomer()
			}
		} else {
			form.$setSubmitted();
			Dialog.show(vm.i18n.msg_lbl_error, vm.i18n.msg_mandatory_fields_error);
		}
	}
	
	function createNewCustomer(){
		crudService.create('cliente', vm.cliente).then(function(response) {        	
			setFormData(response.data);
			Toast.show('success', getResourceDesc(response.data)
        						+ vm.i18n.msg_save_success);
        });
	}
	
	function editCustomer(){
		crudService.edit('cliente', vm.id, vm.cliente).then(function(response) {        	
			setFormData(response.data);
			Toast.show('success', getResourceDesc(response.data)
        						+ vm.i18n.msg_change_success);
        });
	}
	
	function deactivateCustomer(){
		crudService.remove('cliente', vm.id).then(function(response) {        	
			setFormData(response.data);
			Toast.show('success', getResourceDesc(response.data)
        							+ vm.i18n.msg_deactivate_success);
        });
	}
	
	function activateCustomer(){
		crudService.activate('cliente', vm.id).then(function(response) {        	
			setFormData(response.data);
        	Toast.show('success', getResourceDesc(response.data) 
        					+ vm.i18n.msg_reactivate_success);
        });
	}
	
	function findCustomer(){
		crudService.getById('cliente', vm.id).then(function(response) {        	
			setFormData(response.data);        	
        });
	}
	
	function setFormData(data){
		vm.cliente = data;
    	vm.id = vm.cliente.id;    	
	}
	
	function getResourceDesc(data){
		return	data.id + " - " + 
				data.nome + " - ";
	}
	
	function clearForm(form){
		form.$setPristine();
		vm.cliente = {};
		vm.id = 0;
		form.$setUntouched();
	}	
	
	function searchAddress(cep){
		searchService.address(cep, true).then(function(response) {        	
        	if (!response.data.erro){
	        	vm.cliente.endereco.cep = response.data.cep;
	        	vm.cliente.endereco.logradouro = response.data.logradouro;
	        	vm.cliente.endereco.bairro = response.data.bairro;	        	
	        	vm.cliente.endereco.cidade = {'key' : response.data.ibge, 'value' : (response.data.localidade + ' / ' + response.data.uf) }
	        	vm.cliente.endereco.complemento = '';
	        	vm.cliente.endereco.numero = '';
        	} else {
        		Dialog.show(vm.i18n.msg_lbl_error, vm.i18n.msg_cep_error);
        	}
        });		
	}
	
}]);