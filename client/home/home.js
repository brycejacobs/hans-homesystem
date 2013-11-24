
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

  socket.on('discover:start', function () {
    $scope.scanning = true;
  });

  socket.on('discover:end', function () {
    $scope.scanning = false;
  })

  $scope.toggleDevice = function (device) {
    socket.emit('device:toggle', {
      device: device
    });
  }
});
