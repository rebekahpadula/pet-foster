var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var FooterNavView = require('../footerNav/footerNavView');
var dispatcher = require('../events/dispatcher')
;
var AppView = Backbone.View.extend({

    className: 'app',

    template: _.template(require('./appView.html')),

    initialize: function () {
        this.footerNavView = new FooterNavView();
        this.listenTo(dispatcher, 'app:show', this.show);
    },

    render: function () {
        this.$el.html(this.template());
        this.$('.footer-nav-view').append(this.footerNavView.$el);
        this.footerNavView.render();
    },

    show: function (view) {
        if (this.child) {
            this.child.remove();
        }
        view.render();
        this.$('.page-slot').append(view.$el);
        this.child = view;
    }

});

module.exports = AppView;