var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var AnimalListView = require('../animalList/AnimalListView');

var DashboardView = Backbone.View.extend({

    className: 'dashboardView',

    template: _.template(require('./dashboardView.html')),

    initialize: function (options) {
        this.listenTo(this.collection, 'sync', this.render);
        this.animalListView = new AnimalListView({
            collection: this.collection
        });
    },

    render: function () {
        this.$el.html(this.template());
        this.animalListView.render();
        this.$('.available-animals-slot').append(this.animalListView.$el);
    }
});

module.exports = DashboardView;