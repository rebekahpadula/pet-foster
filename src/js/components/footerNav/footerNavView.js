// footer navigation

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var FooterNavView = Backbone.View.extend({

    template: _.template(require('./footerNavView.html')),

    render: function () {
        this.$el.html(this.template());
    },

    events: {
        'click .browse': 'browseDashboard',
        'click. .my-info': 'myInfo',
        'click .search': 'search',
        'click .favorites': 'favorites',
    },

    browseDashboard: function () {
        window.location.hash = '';
    },

    myInfo: function () {
        window.location.hash = 'my-info';
    },

    search: function () {
        window.location.hash = 'search';
    },

    favorites: function () {
        window.location.hash = 'favorites';
    },

    shelters: function () {
        window.location.hash = 'shelters';
    }

});

module.exports = FooterNavView;