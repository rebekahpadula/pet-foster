var Backbone = require('backbone');

var dispatcher = require('../events/dispatcher');

var FavoritesCollection = Backbone.Collection.extend({

    url: '/favorites',

    createFavorites: function (obj) {
        this.create(obj);
    },

    initialize: function () {
        this.listenTo(dispatcher, 'favorite', this.createFavorites);
    }
});

module.exports = new FavoritesCollection();