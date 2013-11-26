'use strict';

var XBee = require('svd-xbee');

exports.onConnect = function (socket) {

  socket.on('device:toggle', function () {
    //This will be of format {_id: String, status: bool, current: Dont Care}
    //This should tell the xbee to send out a msg to that device to turn on/off
  });

  var xbee = new XBee({
    port: 'COM0',   // replace with yours
    baudrate: 9600 // 9600 is default
  }).init();

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
};

exports.onDisconnect = function (socket) {
 //
}



  // Add Node by hand...
  // var myNode = xbee.addNode([0x00,0x13,0xa2,0x00,0x40,0x61,0x2f,0xe4]); //Must either hard code or discover nodes.


