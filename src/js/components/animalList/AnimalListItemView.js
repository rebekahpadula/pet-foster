// view for individual animal profile

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var AvailableAnimalListItemView = Backbone.View.extend({

    tagName: 'li',

    className: 'pet-profile',

    template: _.template(require('./animalListItemView.html')),

    events: {
        'click': 'onClick'
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },

    onClick: function () {
        window.location.hash = 'details/' + this.model.get('id');
    }

});

module.exports = AvailableAnimalListItemView;