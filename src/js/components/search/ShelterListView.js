// view for list of all shelters

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var ShelterListItemView = require('./shelterListItemView');

var ShelterListView = Backbone.View.extend({

    tagName: 'select',

    className: 'shelter-list',

    template: _.template(require('./shelterListView.html')),

    events: {
        'change': 'onChange'
    },

    initialize: function (options) {
        // this.shelterCollection = options.shelterCollection;
        this.shelterViews = [];
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        var _this = this;

        this.$el.html(this.template());

        this.removeChildren();

        // Append an empty option
        _this.$el.append($('<option>'));

        this.shelterViews = this.collection.map(function (model) {
            return new ShelterListItemView({ model: model, parentView: _this });
        });

        this.shelterViews.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    },

    removeChildren: function () {
        this.shelterViews.forEach(function (view) {
            view.remove();
        });
    },

    onChange: function () {
        this.trigger('select', this.$el.val());
    }
});

module.exports = ShelterListView;