/*
 * server/socketio.js
 */

'use strict';

var util = require('util'),
    sockets = require('./sockets/xbee');

var _socketio = null;

exports.register = function (app) {

  _socketio = app.servers.socketio.getServer();

  // _socketio.enable('browser client minification');
  // _socketio.enable('browser client etag');
  // _socketio.enable('browser client gzip');
  _socketio.set('log level', 2);

  _socketio.sockets.on('connection', function (socket) {

    socket.ip = util.format(
      '%s:%s',
      socket.handshake.address.address,
      socket.handshake.address.port
    ); //for storage of socket.

    console.log('[%s] CONNECTED', socket.ip);

    sockets.onConnect(socket);

    socket.on('disconnect', function () {
      sockets.onDisconnect();
      console.log('[%s] DISCONNECTED', socket.ip);
    });
  });
};
