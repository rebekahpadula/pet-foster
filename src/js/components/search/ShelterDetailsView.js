var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var ShelterDetailsView = Backbone.View.extend({

    className: 'shelter-details',

    template: _.template(require('./shelterDetailsView.html')),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = ShelterDetailsView;