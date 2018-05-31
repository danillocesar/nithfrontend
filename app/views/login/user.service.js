 'use strict';
angular.module('nithapp')
.factory('$user', function($myHttp) {
	return{
		signup : function(user, callback){
			var url = '/api/signup';
			var params = {};
			$myHttp.post(url, params, user, callback);
       	},
    }
});