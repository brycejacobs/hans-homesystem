'use strict';

var util = require('util');

var _ = require('lodash'),
    bcrypt = require('bcrypt'),
    ultimate = require('soultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin,
    type = ultimate.db.mongoose.type;

var app = require('../app');

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