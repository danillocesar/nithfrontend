 'use strict';
angular.module('nithapp')
.factory('$videos', function($myHttp) {
	return{
		listAll : function(callback){
			var url = '/videos';
			var params = {};
			$myHttp.get(url, params, callback);
       	},
    }
});