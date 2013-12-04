'use strict';

var xbee_api = require('xbee-api');
var SerialPort = require('serialport').SerialPort;
var util = require('util');


exports.onConnect = function (socket) {

  socket.on('device:toggle', function () {
    //This will be of format {_id: String, status: bool, current: Dont Care}
    //This should tell the xbee to send out a msg to that device to turn on/off'
    // writeToggle(serialPort);
  });

  // SerialPort.list(function (err, ports) {
  //   ports.forEach(function(port) {
  //     console.log(port.comName);
  //     console.log(port.pnpId);
  //     console.log(port.manufacturer);
  //   });
  // });
  var C = xbee_api.constants;

  var xbeeAPI = new xbee_api.XBeeAPI({
    'api_mode': 1
  });

  var serialport = new SerialPort('/dev/cu.usbserial-FTGDGWJ0', {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
  });

  serialport.on('open', function() {
    console.log('Serial port open... sending ATND');
    writeToggle(serialport);
  });

  xbeeAPI.on('frame_object', function(frame) {
    console.log('OBJ> ' + util.inspect(frame));
  });

  function writeToggle(serialPort) {
    var frame = {
      id: xbeeAPI.nextFrameId(),
      type: C.FRAME_TYPE.AT_COMMAND,
      command: 's',
      commandParameter: [],
    };

    serialPort.write(xbeeAPI.buildFrame(frame), function(err, res) {
      if (err) {
        throw(err);
      } else {
        console.log('written bytes: ' + util.inspect(res));
      }
    });
  }
};

exports.onDisconnect = function () {
 //
};
