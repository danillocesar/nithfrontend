'use strict';
  
angular.module('nithapp')
.factory('AuthenticationService', function ($http, $cookies, $rootScope, API, Loading, Dialog, $myHttp, $base64) {
        var service = {};

        service.login = function (username, password, callback) {
            
            var url = '/api/authenticate';
       	    var params = {'username':username, 'password':password};
        	
        	var headers = {
					method: 'POST',
					url: API + url,
					params: params
			  };
			$http(headers).then(function successCallback(response) {
	       		if(response.data.success) {
	       			if(callback) callback(response);
	       		}else{
	       			Loading.stop();
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
        };
        service.setCredentials = function (user) {
            var authdata = $base64.encode(user.email  + ':' + user.password);
            let currentUser = {
                                login: user.email,
                                password: user.password,
                                whatsapp: user.whatsapp,
                                name: user.name,
                                authdata: authdata
                            }
            localStorage.setItem("currentUser", JSON.stringify(currentUser)); 
            $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
        };
  
        service.clearCredentials = function () {
            localStorage.removeItem("currentUser");
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
  
        return service;
    })