/*
 * server/routes.js
 */

'use strict';

var ultimate = require('soultimate');

// Register controllers to routes.
exports.register = function (app) {
  var csrf = ultimate.server.controller.csrf,
      ensureAdmin = ultimate.server.controller.ensureAdmin,
      ensureGuest = ultimate.server.controller.ensureGuest,
      ensureUser = ultimate.server.controller.ensureUser;

  var error404 = ultimate.server.route.error404;

  var c = app.controllers,
      s = app.servers.express.getServer();

  // Home
  s.get('/express', c.home.express);

  // Auth
  s.post('/login', ensureGuest, csrf, c.auth.loginPOST);
  s.post('/logout', c.auth.logoutPOST);
  s.post('/lost-password', ensureGuest, csrf, c.auth.lostPasswordPOST);
  s.post('/register', ensureGuest, csrf, c.auth.registerPOST);


  // Blacklist (404.html)
  s.get(/^\/api(?:[\/#?].*)?$/, c.home.error404);

  // Whitelist (index.html)
  s.get('*', c.home.index);

  // Catch all (404.html)
  error404.register(s, app);
};
