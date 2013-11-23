
angular.module( 'monitorSystem.auth', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state('signin', {
    url: '/signin',
    controller: 'AuthCtrl',
    templateUrl: 'auth/auth.tpl.html'
  });
})

.controller( 'AuthCtrl', function AuthController( $scope, userFactory ) {

  $scope.login = function login() {
    userFactory.login($scope.username, $scope.password);
  };

});
