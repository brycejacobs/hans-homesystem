
angular.module( 'monitorSystem.auth', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state('home.signin', {
    url: '/signin',
    views: {
      'signin@': {
        controller: 'AuthCtrl',
        templateUrl: 'auth/auth.tpl.html'
      }
    }
  });
})

.controller( 'AuthCtrl', function AuthController( $scope, userFactory ) {

  $scope.login = function login() {
    userFactory.login($scope.username, $scope.password);
  };

});
