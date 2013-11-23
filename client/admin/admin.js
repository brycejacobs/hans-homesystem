
angular.module( 'sosickBoilerplate.admin', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin', {
    url: '/admin',
    controller: 'AdminCtrl',
    templateUrl: 'admin/admin.tpl.html',
    resolve: {
      users: function (admin) {
        return admin.users();
      }
    }
  });
})

.controller( 'AdminCtrl', function AccountController( $scope, users, admin ) {
  $scope.users = users;

  $scope.setAdmin = function setAdmin(user) {
    user.roles.push('admin');
    admin.updateUser(user);
  };

  $scope.removeAdmin = function clearAdmin(user) {
    user.roles = _.without(user.roles, 'admin');
    admin.updateUser(user);
  };
})

;
