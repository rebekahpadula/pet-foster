var Backbone = require('backbone');
var _ = require('underscore');

var FavoritesItemView = Backbone.View.extend({

    tagName: 'li',

    className: 'pet-profile',

    template: _.template(require('./favoritesItemView.html')),

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

module.exports = FavoritesItemView;