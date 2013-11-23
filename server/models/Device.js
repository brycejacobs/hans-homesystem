'use strict';

var ultimate = require('soultimate');

var mongoose = ultimate.lib.mongoose;

// Schema
var schema = new mongoose.Schema({
  status: {type: Boolean, default: false}
});


// Model
var model = mongoose.model('Device', schema);
var baucis = require('baucis');
baucis.rest({
  singular: 'Device',
  plural: 'Devices'
});

exports = module.exports = model;