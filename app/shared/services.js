 'use strict';
angular.module('nithapp')
.factory('$myHttp', function($http, Loading, Dialog, API, $rootScope, $state, $mdToast) {
	return{
		get : function(url, params, callback){
			var method = 'GET';
			this.doGetRequest(method, url, params, callback)
       	},
       	post : function(url, params, data, callback){
       		var method = 'POST';
			this.doRequest(method, url, params, data, callback)
       	},
		doRequest : function(method, url, params, data, callback){
			var headers = {
					method: method,
					url: API + url,
					params: params,
					data: data
			  };
			$http(headers).then(function successCallback(response) {
	       		if(response.data.success) {
	       			if(callback) callback(response);
	       			//TOAST WITH DATA.DESCRIPTION
	       		}else{
	       			Dialog.alert("Aviso!", response.data.description, null);
	       		}
	       	},
	       	function errorCallback(response) {
	       		if(response.data && response.data.description){
	       			Dialog.alert("Aviso!", response.data.description, null);
	       			if(response.data.status == 401){
	       				$state.go("login");
	       			}
	       		}else{
	       			Dialog.alertConnection();
	       		}
	       		Loading.stop();
	       	});
		},
		doGetRequest : function(method, url, params, callback){
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            $http.defaults.headers.common['Authorization'] = 'Basic ' + currentUser.authdata;
			var headers = {
					method: method,
					url: API + url,
					params: params
			  };
			return $http(headers).then(function successCallback(response) {
				callback(response);
	       	},
	       	function errorCallback(response) {
	       		Loading.stop();
	       		callback(response);
	       	});
		}
   	}
})
.factory('Loading', function() {
	var loading = '';
	return{
		start : function(){
				if(loading){
					loading.finish();
				}
				loading = pleaseWait({
					logo: "shared/imgs/logonith.png",
					backgroundColor: '#8ba4de',
					template: "<div class='pg-loading-inner'>\n  <div class='pg-loading-center-outer'>\n    <div class='pg-loading-center-middle'>\n      <h1 class='pg-loading-logo-header'>\n        <img class='pg-loading-logo'></img>\n      </h1>\n      <div class='pg-loading-html'>\n      </div>\n    </div>\n  </div>\n</div>",
					loadingHtml: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
				});
			return loading;
		},
		stop : function(){
			if(loading){
				loading.finish();
			}
		}
		
	}
})
.factory('Dialog', function($mdDialog) {
	return{
		alert : function(title, msg, callback) {
	        $mdDialog.show(
	                $mdDialog.alert()
	                  .title(title)
	                  .textContent(msg)
	                  .ok('Okay')
	              ).then(function(){
	            	  	if(callback){
	            	  		callback();
	            	  	}
	            	  	
	              });
		},
		alertConnection : function(){
			$mdDialog.show(
	                $mdDialog.alert()
	                  .title("Erro de conexão")
	                  .textContent("Ocorreu um erro em nosso servidor ou na sua conexão. Verifique sua conexão ou entre em contato com o suporte.")
	                  .ok('Okay'));
		}
	}
})
