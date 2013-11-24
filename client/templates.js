angular.module('templates-app', ['account/account.tpl.html', 'admin/admin.tpl.html', 'auth/auth.tpl.html', 'home/home.tpl.html', 'register/register.tpl.html']);

angular.module("account/account.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<h1>Account Page</h1>\n" +
    "<button class=\"btn btn-danger\" ng-click=\"user.logout()\">Logout</button>");
}]);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<h1>Admin Area</h1>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Users</h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li ng-repeat=\"user in users\" class=\"list-group-item\">\n" +
    "        <span class=\"badge\" ng-if=\"user.isAdmin()\">Admin</span>\n" +
    "        <h4 class=\"list-group-item-heading\">{{user.name.first}} {{user.name.last}}</h4>\n" +
    "        <p class=\"list-group-item-text\">\n" +
    "          Joined on: {{user.createdAt | date}}\n" +
    "          <span ng-if=\"user.isAdmin()\"><br /><a ng-click=\"removeAdmin(user)\">Remove Admin Status</a></span>\n" +
    "          <span ng-if=\"!user.isAdmin()\"><br /><a ng-click=\"setAdmin(user)\">Set Admin Status</a></span>\n" +
    "        </p>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("auth/auth.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/auth.tpl.html",
    "<form>\n" +
    "\n" +
    "  <div class=\"alert alert-danger\" ng-if=\"errors.length\">\n" +
    "    <div ng-repeat=\"message in errors\" ng-hide=\"message.hidden\" ng-bind-html=\"message\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <h2>Please log in</h2>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-11\">\n" +
    "      <input type=\"text\" class=\"form-control\" name=\"username\" placeholder=\"e-mail address\" ng-model=\"username\"></input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-11\">\n" +
    "      <input type=\"password\" ng-model=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\"></input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-offset-2 col-lg-10\">\n" +
    "      <button class=\"btn btn-default btn-large\" ng-click=\"login()\">Login</button>\n" +
    "      <a class=\"btn btn-large\" href=\"#/register\">Register</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr>\n" +
    "</form>\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<ul>\n" +
    "  <li ng-repeat=\"device in devices\">\n" +
    "    {{device.status}} - {{device.current}}\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("register/register.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/register.tpl.html",
    "<form class=\"register form-horizontal\" novalidate>\n" +
    "  <div class=\"alert alert-danger\" ng-if=\"errors.length\">\n" +
    "    <div ng-repeat=\"message in errors\" ng-hide=\"message.hidden\" ng-bind-html=\"message\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <h2>New account</h2>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-11\">\n" +
    "      <input type=\"text\" ng-required class=\"form-control\" name=\"username\" placeholder=\"e-mail address\" ng-model=\"username\"></input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-11\">\n" +
    "      <input type=\"password\" ng-required ng-model=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\"></input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-11\">\n" +
    "      <input type=\"password\" ng-required class=\"form-control\" ng-model=\"passwordRepeat\" name=\"passwordRepeat\" placeholder=\"repeat password\"></input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"row col-lg-11\">\n" +
    "      <div class=\"col-6\" style=\"padding-right: 0;\">\n" +
    "        <input type=\"text\" ng-required class=\"form-control\" name=\"firstName\" placeholder=\"first name\" ng-model=\"firstName\"></input>\n" +
    "      </div>\n" +
    "      <div class=\"col-6\" style=\"padding-right: 0;\">\n" +
    "        <input type=\"text\" ng-required class=\"form-control\" name=\"lastName\" placeholder=\"last name\" ng-model=\"lastName\"></input>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr>\n" +
    "\n" +
    "  <div class=\"row form-group\">\n" +
    "    <div class=\"col-lg-offset-2 col-lg-10\">\n" +
    "      <button class=\"btn btn-default btn-large\" ng-click=\"register()\">Register</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);
