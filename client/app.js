angular.module( 'monitorSystem', [
  'templates-app',
  'monitorSystem.home',
  'monitorSystem.auth',
  'monitorSystem.register',
  'monitorSystem.account',
  'monitorSystem.admin',
  'ui.router',
  'ui.bootstrap',
  'ngCookies',
  'ngSanitize'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.controller( 'AppCtrl', function AppCtrl ($scope, userFactory ) {
  $scope.name = userFactory.name;
})

;