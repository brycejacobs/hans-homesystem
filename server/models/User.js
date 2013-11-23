/*
 * server/models/User.js
 */

'use strict';

var bcrypt = require('bcrypt'),
    ultimate = require('soultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin,
    type = ultimate.db.mongoose.type;

// Schema
var schema = new mongoose.Schema({
  email: { type: type.Email, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  accessToken: { type: String },
  auth: {
    local: {
      username: { type: type.Email },
      password: { type: String }
    }
  },
  devices: [{type: mongoose.Schema.ObjectId, ref: 'Device'}],
  roles: [{ type: String }]
});

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);


// Indexes
schema.path('email').index({ unique: true });
schema.path('accessToken').index({ unique: true });
schema.path('auth.local.username').index({ unique: true, sparse: true });

// Virtuals
schema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});
schema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  if (split.length >= 2) {
    this.name.last = split.splice(split.length - 1).join(' ');
  } else {
    this.name.last = '';
  }
  this.name.first = split.join(' ');
});
schema.virtual('isAdmin').get(function () {
  return this.roles.indexOf('admin') > -1;
});

// Bcrypt middleware
schema.pre('save', function (next) {
  var SALT_WORK_FACTOR = 10,
      user = this;

  if (!user.isModified('auth.local.password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.auth.local.password, salt, function (err, hash) {
      if (err) { return next(err); }
      user.auth.local.password = hash;
      next();
    });
  });
});

// Password verification
schema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.auth.local.password, function (err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

// Model
var model = mongoose.model('User', schema);
var baucis = require('baucis');
baucis.rest({
  singular: 'User',
  plural: 'Users'
});

// Public API
exports = module.exports = model;
