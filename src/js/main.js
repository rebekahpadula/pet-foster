var $ = require('jquery');
var Backbone = require('backbone');
var AppView = require('./components/app/appView');
var AppRouter = require('./appRouter');

var appView = new AppView();

$('#app-container').append(appView.$el);

appView.render();

var router = new AppRouter();

Backbone.history.start();