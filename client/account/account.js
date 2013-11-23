
angular.module( 'sosickBoilerplate.account', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'account', {
    url: '/account',
    controller: 'AccountCtrl',
    templateUrl: 'account/account.tpl.html'
  });
})

.controller( 'AccountCtrl', function AccountController( ) {

})

;
