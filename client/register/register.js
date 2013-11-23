
angular.module( 'monitorSystem.register', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    controller: 'RegisterCtrl',
    templateUrl: 'register/register.tpl.html'
  });
})

.controller( 'RegisterCtrl', function AccountController( $scope, user ) {

  $scope.register = function registerUser() {
    var newUser = {
      username: $scope.username,
      password: $scope.password,
      passwordRepeat: $scope.passwordRepeat,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    };

    user.register(newUser)
      .error(function (result) {
        $scope.errors = result.errors;
      });
  };

})

;
