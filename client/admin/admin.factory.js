angular.module( 'sosickBoilerplate.admin')
  .factory('admin', function ( $http, $q ) {

    var users = [];

    function decorateUser(user) {
      user.isAdmin = function () {
        return _.contains(user.roles, 'admin');
      };

      return user;
    }

    function updateUser(user) {
      $http.put('/api/v1/users/' + user._id, user).then(function (result) {
        users[users.indexOf(user)] = decorateUser(result.data);
      });
    }

    function allUsers() {
      var deferred = $q.defer();

      $http.get('/api/v1/users', { cache: true })
        .success(function (data) {
          users = _.map(data, decorateUser);
          deferred.resolve(users);
        })
        .error(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    var output = {
      users: allUsers,
      updateUser: updateUser
    };

    return output;
  });