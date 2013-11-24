/*
 * server/socketio.js
 */

'use strict';

var util = require('util'),
    XBee = require('svd-xbee');

var _socketio = null;

exports.register = function (app) {
  var socket = null;
  var xbee = new XBee({
    port: 'COM0',   // replace with yours
    baudrate: 9600 // 9600 is default
  });

  // Add Node by hand...
  var myNode = xbee.addNode([0x00,0x13,0xa2,0x00,0x40,0x61,0x2f,0xe4]); //Must either hard code or discover nodes.

  xbee.on('initialized', function(params) {
    console.log('XBee Parameters: %s', util.inspect(params));
    if(socket) {
      socket.emit('discover:start', {
        data: null
      });
    }
    xbee.discover();
  });

  xbee.on('discoveryEnd', function() {
    if(socket) {
      socket.emit('discover:end', {
        data: null
      });
    }
  });

  // Triggered whenever a node is discovered that is not already
  xbee.on('newNodeDiscovered', function(node) {
    //this node that is emitted needs to be of the format {_id: String, status: bool, current: Number}
    if(socket) {
      socket.emit('device:add', {
        device: null
      });
    }

    console.log('Node %s discovered.', node.remote64.hex);
  });


  _socketio = app.servers.socketio.getServer();

  // _socketio.enable('browser client minification');
  // _socketio.enable('browser client etag');
  // _socketio.enable('browser client gzip');
  _socketio.set('log level', 2);

  _socketio.sockets.on('connection', function (socket) {
    xbee.init(); //xbee won't be initialized unless we have a connected socket.

    socket = socket; //present global socket.
    socket.ip = util.format(
      '%s:%s',
      socket.handshake.address.address,
      socket.handshake.address.port
    ); //for storage of socket.

    console.log('[%s] CONNECTED', socket.ip);

    socket.on('device:toggle', function (data) {
      //This will be of format {_id: String, status: bool, current: Dont Care}
      //This should tell the xbee to send out a msg to that device to turn on/off
    });

    socket.on('disconnect', function () {
      console.log('[%s] DISCONNECTED', socket.ip);
    });
  });
};
