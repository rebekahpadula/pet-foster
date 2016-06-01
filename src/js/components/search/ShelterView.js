var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var ShelterCollection = require('../collections/ShelterCollection');
var ShelterListView = require('./shelterListView');

var ShelterView = Backbone.View.extend({

    className: 'shelter-view',

    template: _.template(require('./shelterView.html')),

    events: {
        'click .shelters-zipcode-button': 'searchZipcode'
    },

    initialize: function (options) {
        this.shelterCollection = options.shelterCollection;
        this.listenTo(this.shelterCollection, 'sync', this.render);

        this.shelterListView = new ShelterListView({ collection: this.shelterCollection });
    },

    render: function () {
        this.$el.html(this.template());
        this.shelterListView.render();
        this.$('.shelters-slot').append(this.shelterListView.$el);
    },

    searchZipcode: function () {
        this.shelterCollection.fetch({
            data: {
                location: this.$('#shelter-zipcode').val()
            }
        });
        this.render();
    },

    onKeyDown: function () {
        this.searchZipcode();
    }

    // search: function () {
    //     var data;
    //     this.collection.fetch({ data: { nameStartsWith: this.$('.search').val() } });
    //     data = $('input').val();
    //     window.location.hash = '/character/' + data;
    // },
});

module.exports = ShelterView;