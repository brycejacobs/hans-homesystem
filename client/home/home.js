
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

.controller( 'HomeCtrl', function HomeController($scope, socket) {

  socket.on('init', function (data) {
    $scope.devices = data.devices;
  });

  socket.on('device:add', function (data) {
    $scope.devices.push(data.device);
  });

  socket.on('device:change', function (data) {
    _.forEach($scope.devices, function (item) {
      if(item._id === data.device._id) {
        item = data.device;
      }
    });
  });

  $scope.alerts = [];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.toggleDevice = function (device) {
    socket.emit('device:toggle', {
      device: device
    });
  };
});
