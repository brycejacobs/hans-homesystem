angular.module( 'monitorSystem')
  .factory('userFactory', function ( $cookies, $http, $location ) {

    function get(id) {
      return $http.get('/api/v1/users/' + id)
        .then(function (results) {
          return results.data;
        });
    }

    function logout() {
      return $http.post('/api/logout').then(function () {
        output.name = null;
        $location.path('/home');
      });
    }

    function login(username, password) {
      return $http.post('/api/login', { _csrf: output.csrf, username: username, password: password }).success(function (user) {
        output._id = user._id;
        $location.path('/home');
      });
    }

    function register(user) {
      user._csrf = output.csrf;

      return $http.post('/api/register', user).success(function (fullName) {
        output.name = fullName;
        $location.path('/home');
      });
    }

    var output = {
      _id: $cookies['user._id'],
      name: $cookies['user.name.full'],
      csrf: $cookies.csrf,
      get: get,
      logout: logout,
      login: login,
      register: register
    };

    return output;
  });