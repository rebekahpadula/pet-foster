// view for individual shelters

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var api = require('../../api');
var flattenParsedXMLAttributes = require('../../flattenParsedXMLAttributes');

var ShelterModel = require('./ShelterModel');

var ShelterListItemView = Backbone.View.extend({

    tagName: 'option',

    model: ShelterModel,

    className: 'shelter-profile',

    // template: _.template(require('./shelterListItemView.html')),

    // events: {
    //     'click': 'onClick'
    // },

    // initialize: function (options) {
    //     this.parentView = options.parentView;
    // },

    render: function () {
        this.$el.val(this.model.get('id'));
        this.$el.text(this.model.get('name'));
        // this.$el.html(this.template(this.model.attributes));
    },

    onClick: function () {
        // this.parentView.trigger('select', this.model.id);
        // window.location.hash = 'search/shelters/' + this.model.get('id');
    }
});

module.exports = ShelterListItemView;