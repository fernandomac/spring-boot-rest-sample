module.filter('capitalize', function() {
  return function(token) {
      return token.charAt(0).toUpperCase() + token.slice(1);
   }
});

module.filter('reciprocal', function() {
  return function(token) {
	    if (isNaN(token) || token >= 1){
	    	return token;
	    }
	    return "1/" + parseInt((1 / token));
   }
});

module.filter('unsafe', function($sce) { 
	return $sce.trustAsHtml; 
});

module.filter('cadastroNacional', function() {
	return function(token) {		
		var formatted = token;
		if (token && token.indexOf('.') < 0){
			if (token.length == 11){
				formatted = token.substr( 0, 3 ) + '.' + token.substr( 3, 3 ) + '.' +  
					token.substr( 6, 3 ) + '-' + token.substr( 9, 2 ); 
			} else if (token.length == 14){
				formatted = token.substr( 0, 2 ) + '.' + token.substr( 2, 3 ) + '.' +  
				token.substr( 5, 3 ) + '/' + token.substr( 8, 4 ) + '-' + token.substr( 12, 2 ) ;
			}
		}
		return formatted;
	}
});

module.filter('placa', function() {
	return function(token) {
		var formatted = token;
		if (token && token.indexOf('-') < 0){
			if (token.length == 7){
				formatted = token.substr( 0, 3 ) + '-' + token.substr( 3, 4 );
			}
		}
		return formatted;
	}
});

module.filter('yesno', function() {
	return function(token) {
		return token ? 'Sim' : 'Não';
	}
});

module.filter('grouper', function() {
	return function(token, type) {		
		if (type == 'semana'){
			return autopeca.report.label.semanal[token -1];
		} else if (type == 'mes'){
			return autopeca.report.label.mensal[token -1];
		} else {
			return token;
		}
	}
});

module.filter('details', function($filter) {
	
	return function(token, field) {
		if (! token ) return '';
		
		var regexDateISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
		
		var label = getLabel(field, token);
		var formatted = token;
		
		if ( typeof(token) === 'boolean'){			
			formatted = $filter('yesno')(token);	
		
		} else if ( typeof(token) === 'object' 
					&& (token.constructor.toString().indexOf("Array") > -1) ){
			var result = '';
			
			angular.forEach(token, function(item) {
				result += '( ';
				angular.forEach(item, function(key, value) {
					result += key + ' - ';
				});
				result += ' )';
			});
			formatted = result;
		
		} else if ( typeof(token) === 'object' && token.value){		
			formatted = token.value;
			
		} else if ( typeof(token) === 'object' && token.ddd){		
			formatted = token.ddd + ' ' + token.telefone + ' ' + (token.email || '');	
		
		} else if ( typeof(token) === 'string' && regexDateISO.test(token)){	
			formatted = moment(new Date(token)).format('DD/MM/YYYY', 'UTC');
		
		} else if ( typeof(token) === 'string' && field == 'cadastroNacional'){	
			formatted = $filter('cadastroNacional')(token);
					
		} else if ( typeof(token) === 'string' && field == 'placa'){	
			formatted = $filter('placa')(token);		
		} 
		
		return label + formatted;
		
		function getLabel(field, value){
			if (field == 'cadastroNacional'){
				if (value.length == 11){
					return 'CPF: ';
				} else if (value.length == 14){
					return 'CNPJ: ';
				}
			} else if (field == 'name'){
				return 'Nome: ';
			} else {
				return field.charAt(0).toUpperCase() + field.slice(1) +': ';
			}
		}
	}
});

module.config(function($mdDateLocaleProvider) {
	$mdDateLocaleProvider.formatDate = function(date) {
	  return date ? moment(date).format('DD/MM/YYYY') : null;
	};

	$mdDateLocaleProvider.parseDate = function(dateString) {
	  var m = moment(dateString, 'DD/MM/YYYY', true);
	  return m.isValid() ? m.toDate() : new Date(NaN);
	};
 });