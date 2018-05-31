'use strict';
  
angular.module('nithapp')
  
.controller('HomeController', function ($scope, AuthenticationService, $videos, $mdDialog, $state) {    
    $scope.videos = [];
   
    $scope.openVideo = function(video){
          $mdDialog.show({
            template: '<div  flex layout="row"><iframe  width="100%"  frameborder="0" allowfullscreen src="https://www.youtube.com/embed/'+ video.viId +'"></iframe></div>',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: true
        })
    }
    $scope.logout = function(){
        AuthenticationService.clearCredentials();
        $state.go("login");
    }
    let currentUser = localStorage.getItem("currentUser");
     console.log(currentUser);
    if(!currentUser || currentUser.authdata){
        $scope.logout();   
    }else{
        $videos.listAll(function(response){
            $scope.videos = response.data;
        })
        
    }
});