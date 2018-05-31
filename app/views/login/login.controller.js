'use strict';
  
angular.module('nithapp')
  
.controller('LoginController', function ($scope, $rootScope, $state, $timeout, Loading, AuthenticationService, Dialog, $mdDialog) {
    AuthenticationService.clearCredentials();
    $scope.login = function () {
    	if($scope.formlogin.$valid){
			Loading.start();
			AuthenticationService.login($scope.username, $scope.password, function(response) {
				AuthenticationService.setCredentials(response.data.entity);
				$state.go('home');
                Loading.stop();
			});
    	}
    };
    $scope.openCadastro = function(){
         $mdDialog.show({
            controller: DialogController,
            templateUrl: '/views/login/cadastro.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: true
        })
    }
    function DialogController($scope, $mdDialog, $user, Dialog) {
        $scope.user = {};
        $timeout(function(){document.getElementById("whatsappinput").removeAttribute("placeholder");}, 100);
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.cadastrar = function(){
            $user.signup($scope.user, function(response){
                $mdDialog.cancel();
                Dialog.alert("Sucesso", "Cadastro efetuado com sucesso", null);
            });
        }
    }
});