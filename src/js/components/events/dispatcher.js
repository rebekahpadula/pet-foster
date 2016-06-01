var Backbone = require('backbone');
var _ = require('underscore');

var dispatcher = _.extend({}, Backbone.Events);

module.exports = dispatcher;