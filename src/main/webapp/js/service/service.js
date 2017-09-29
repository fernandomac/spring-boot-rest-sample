module.service('i18n', ['$resource', function($resource) {  
    var service = {
    	'translateView' : translateView,
    	'availableLang' : getAvailableLang
    };
    return service;
       
    function translateView(lang) {
        lang = !lang ? 'pt' : lang;
    	var languageFilePath = './i18n/' + lang + '.json';
        return $resource(languageFilePath).get().$promise.then(function (data) {
        	autopeca.translation = data;          
        	return data;
        });
    };
   
    function getAvailableLang(i18n){
    	if (angular.isUndefined(i18n)) { 
			return [{value: "pt", text: "Portugues"}];
		} else {
			return[{value: "pt", text: i18n.pt}];
		}
	} 

}]);

module.service('crudService',['requestHelper', function(requestHelper){
	var service = {
		'getById' : getService,		
		'remove' : removeService,
		'edit' : editService,
		'create' : createService,
		'activate' : activateService		
	};
	
	return service;
		
	function getService($resource, $unique){	 	
		var url = autopeca.urlHost + $resource + '/' + $unique;
	 	return requestHelper.execute('GET', null, url, true);       
	}	
	
	function removeService($resource, $unique, $data){	 	
		var url = autopeca.urlHost + $resource + '/' + $unique;
		return requestHelper.execute('DELETE', $data, url, true);		
	}
	
	function activateService($resource, $unique){	 	
		var url = autopeca.urlHost + $resource + '/' + $unique;
		return requestHelper.execute('POST', null, url, true);		
	}
	
	function editService($resource, $unique, $data){	 	
		var url = autopeca.urlHost + $resource + '/' + $unique;
		return requestHelper.execute('PUT', $data, url, true);		
	}
	
	function createService($resource, $data){	 	
	 	var url = autopeca.urlHost + $resource + '/';
		return requestHelper.execute('POST', $data, url, true);		
	}	
}]);

module.service('loginService',['requestHelper', '$q', '$window', 'Loading', 'Dialog', 
                     function(requestHelper, $q, $window, Loading, Dialog){  
    var service = {
    	'authentication'    : authenticationService,
    	'logout'    		: logoutService,
    	'changePassword'    : changePasswordService,
    	'forgotPassword'    : forgotPasswordService,
    	'getLogin'			: getLoginService
    	
    };
    return service;
    
    function authenticationService(email, senha){
    	return requestHelper.executeAuthentication(email, senha).then(function(response) {        	
			  if (response.status == 200){
				  window.localStorage.setItem('X-fv-auth-token', response.data.token);
			  } else if (response.status == 302){
				  $window.location.href = '/#/login/change'; 
			  }
			  return response;
		  });    
    }
    
    function logoutService(){
    	var url = autopeca.urlHost + 'login';
    	return requestHelper.execute('DELETE', null, url, true).then(function(response) {        	
			  if (response.status == 204){
				  window.localStorage.removeItem('X-fv-auth-token');
				  autopeca.login = {};
				  $window.location.href = '/#/aboutus'; 
			  }
			  return response;
		  });    
    }
    
    function changePasswordService(email, senha, nova){
    	return requestHelper.executeChangeAuthentication(email, senha, nova);
    }
    
    function forgotPasswordService(email){
    	var url = autopeca.urlHost + 'login/'+email;
    	return requestHelper.execute('PUT', null, url, true).then(function(response) {        	
				  if (response.status == 204){
					  Dialog.show(autopeca.translation.msg_lbl_success, autopeca.translation.msg_reset_pass_success);
					  $window.location.href = '/#/login'; 
				  }
				  return response;
			  }, function(error) {       	
		        	if (error.httpCode == 404){
		    			Dialog.show(autopeca.translation.msg_lbl_error, autopeca.translation.msg_resource_not_found);			
		    		}        	
			  });    
    }
    
    function getLoginService(){    	
    	var token = window.localStorage.getItem('X-fv-auth-token');
		if (token){			
			autopeca.login.token = token;
			var url = autopeca.urlHost + 'login';
			return requestHelper.execute('GET', null, url, false).then(function(response) {							
					autopeca.login = response.data;					
					return $q.defer().resolve(autopeca.login);
				});    
		} else {			
			return $q.reject();
		}    	
    }
    
}]);

module.service('reportService',['requestHelper', '$q', 'Loading', 'Dialog', 
                               function(requestHelper, $q, Loading, Dialog){  
  var service = {
		  'sendEmailManutencao'    : sendEmailManutencao,
		  'getManutencaoReport'    : getManutencaoReport,
		  'manutencaoSummary'    : manutencaoSummaryReport,
		  'getPreview' : getPreview 
  };
  return service;
  
  function sendEmailManutencao($unique){
	  var url = autopeca.urlHost + 'report/manutencao/' + $unique;
	  return requestHelper.execute('POST', null, url, true).then(function(response) {        	
			  if (response.status == 204){
				  Dialog.show(autopeca.translation.msg_lbl_success, autopeca.translation.msg_email_success);
			  }
			  return response;
		  });    
  }
  
  function getManutencaoReport($unique){
	  var url = autopeca.urlHost + 'report/manutencao/' + $unique;
	  return requestHelper.execute('GET', null, url, true);
  }
  
  function getPreview (){
	  var url = autopeca.urlHost + 'report/preview';
	  return requestHelper.execute('GET', null, url, true);
  }
  
  function manutencaoSummaryReport($filter){
	  var url = autopeca.urlHost + 'report/manutencao?' + $filter;
	  return requestHelper.execute('GET', null, url, true);
  }
              
}]); 

module.service('publicRelationService',['requestHelper', '$q', 'Loading', 'Dialog', 
                                function(requestHelper, $q, Loading, Dialog){  
   var service = {
 		  'sendContactMessage'    : sendContactMessage
   };
   return service;
   
   function sendContactMessage($message){
 	  var url = autopeca.urlHost + 'public/message/';
 	  return requestHelper.execute('POST', $message, url, true).then(function(response) {        	
 			  if (response.status == 204){
 				  Dialog.show(autopeca.translation.msg_lbl_success, autopeca.translation.msg_email_success);
 			  }
 			  return response;
 		  });    
   }
  
}]);    

module.service('searchService',['requestHelper', '$q', 'Loading', 'Dialog', 
                     function(requestHelper, $q, Loading, Dialog){  
    var service = {
    	'list'    : listService,
    	'cacheList'    : cacheList,
    	'find'    : findService,
    	'address' : searchAddress,
    	'setResultCache' : setResultCache,
    	'getResultCache' : getResultCache,
    	'autocompleteCliente' : autocompleteCliente,    	
    	'autocompleteMarca' : autocompleteMarca,
    	'autocompleteVeiculo' :autocompleteVeiculo,
    	'autocompleteCidade' :autocompleteCidade,
    	'autocompletePeca' :autocompletePeca
    };
    return service;
    
    function setResultCache(type, result){
    	autopeca.resultCache.type = type;
    	autopeca.resultCache.result = result;
    }
    
    function getResultCache(type){
    	if (autopeca.resultCache.type == type){
    		return autopeca.resultCache.result;
    	} else {
    		return [];
    	}
    }
    
    function listService($resource, $filter){
		var url = autopeca.urlHost + $resource + '?' + $filter;
		return requestHelper.execute('GET', null, url, true);		
	}
    
    function cacheList($resource){
		 if (autopeca.resultCache[$resource]){
			 return $q.resolve(autopeca.resultCache[$resource]);			
		 } else {
			 var url = autopeca.urlHost + $resource;
			 return listService($resource, null).then(function(resp){
				 autopeca.resultCache[$resource] = resp.data; 
				 return autopeca.resultCache[$resource];
			 });	
		 }
    	
	}    
    
    function findService($resource, $unique){
    	var url = autopeca.urlHost + $resource + '/' + $unique;
	 	return requestHelper.execute('GET', null, url, true);		
	}
    
    function searchAddress(cep, showLoading){
		var cepAux = cep.replace(".","").replace("-","").replace("_","");
		var pattern = new RegExp('[0-9]{8}');
		
		if (!pattern.test(cepAux)){
			Dialog.show(autopeca.translation.msg_lbl_error, vm.i18n.vm.i18n.msg_cep_error);
			return $q.reject(autopeca.translation.msg_lbl_error, vm.i18n.vm.i18n.msg_cep_error);
		}		
		var url = "https://viacep.com.br/ws/"+cepAux+"/json/";

		return requestHelper.executeExternal('GET', null, url, true);		
	}
    
    function autocompleteCliente(query) {		
    	return queryAutocomplete('reference/cliente', query);    	
	}
	
	function autocompleteMarca(query) {		
    	return queryAutocomplete('reference/marca', query);
	}
	
	function autocompleteVeiculo(query) {		
    	return queryAutocomplete('reference/veiculo', query);
	}
	
	function autocompleteCidade(query) {		
    	return queryAutocomplete('reference/cidade', query);
	}
	
	function autocompletePeca(query) {		
    	return queryAutocomplete('reference/peca', query);
	}
	
	function queryAutocomplete($resource, query){
		var results = query ? autopeca.autocomplete.filter( queryFilterFor(query) ) 
    			: autopeca.autocomplete, deferred;
		
		if (query.length == 2){
			deferred = $q.defer();
			listService($resource, 'searchStart='+query).then(function(response) {	        	
				autopeca.autocomplete = response.data;
	        	results = autopeca.autocomplete;
	        	return deferred.resolve(results);
	        });
		}	
		return results;
	}
	
	function queryFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		var uppercaseQuery = angular.uppercase(query);
		return function filterFn(item) {
			return ( (item.autocomplete.indexOf(lowercaseQuery) === 0) ||
					(item.key.indexOf(uppercaseQuery) === 0) );
		};
	}
	
}]);

module.service('requestHelper',['$http','$q', '$window', 'Loading', 'Dialog', 
                                function($http, $q, $window, Loading, Dialog){  
    var service = {
    	'execute' : internalRequest,
    	'executeExternal' : externalRequest,
    	'executeAuthentication' : authenticationRequest,
    	'executeChangeAuthentication' : authenticationChangeRequest
    };
    return service;
    
    function internalRequest($verb, $data, $url, showLoading){
    	var headers = {'Content-Type': 'application/json', 'user-token': autopeca.login.token};
    	return executeRequest($verb, $data, $url, headers, showLoading);
    }
    
    function externalRequest($verb, $data, $url, showLoading){
    	var headers = {'Content-Type': 'application/json'};
    	return executeRequest($verb, $data, $url, headers, showLoading);
    }
    
    function authenticationRequest($email, $pass){
    	var headers = {'Content-Type': 'application/json', 'user-email': $email, 'user-pass': $pass};
    	return executeRequest('POST', null, autopeca.urlHost + 'login', headers, true);
    }
    
    function authenticationChangeRequest($email, $pass, $newPass){
    	var headers = {'Content-Type': 'application/json', 'user-email': $email, 'user-pass': $pass, 'user-new': $newPass};
    	return executeRequest('PUT', null, autopeca.urlHost + 'login', headers, true);
    }
    
    function executeRequest($verb, $data, $url, $headers, showLoading){
		//console.log("INFO - Request URI: "+ $url + " - VERB: " + $verb + " - data: " + JSON.stringify($data));
		if (showLoading) Loading.show();
		return  $http({
		            url: $url,           
		            data: $data,
		            method: $verb,
		            headers: $headers 
	        	}).then(function(resp){
	        		if (showLoading) Loading.hide();
	        		return resp;
	        	}, function(error) {
	        		var msg = errorHandler(error); 
	        		if (showLoading) {
	        			Loading.hide();
	        			if (msg.showDialog){
	        				Dialog.show(msg.tittle, msg.text);
	        			}
	        		}
	        		return $q.reject(msg);
	            });
	}
    
    function errorHandler(error){		
		var i18n = autopeca.translation;
		var message = {'title' : '', 'text': '', 'showDialog': true, 'httpCode': error.status};
		switch (error.status) {
			case  -1: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = i18n.msg_connection_error;; 
				break;				
			case 302: 
				message.tittle = autopeca.translation.msg_lbl_warning;
				message.text = error.data.message; 
				$window.location.href = '/#/login/change'; 
				break;				
			case 400: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = error.data.message; 
				break;
			case 401: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = i18n.msg_unauthorised; 
				break;
			case 402: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = i18n.msg_payment_expected;
				if (autopeca.login && autopeca.login.perfil == 'Administrador'){
					$window.location.href = '/#/subscription/1';					
				} else {
					$window.location.href = '/#/aboutus';
				}
				break;	
			case 403: 
				window.localStorage.removeItem('X-fv-auth-token');
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = i18n.msg_must_be_logged; 
				$window.location.href = '/#/login'; 
				break;				
			case 404: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = error.data.message ? error.data.message : i18n.msg_resource_not_found; 
				message.showDialog = false;
				break;
			case 500: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = autopeca.translation.msg_server_error;					
				console.log("ERROR 500: "+ error.data.message);
				break;
			case 503: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = error.data.message;				
				break;		
			default: 
				message.tittle = autopeca.translation.msg_lbl_error;
				message.text = error.data || error; 
				break;				
		}		
		return message;			 
	}
    
}]);