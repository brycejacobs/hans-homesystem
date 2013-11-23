
angular.module( 'monitorSystem.home', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    controller: 'HomeCtrl',
    templateUrl: 'home/home.tpl.html'
  });
})

.controller( 'HomeCtrl', function HomeController( ) {

});
