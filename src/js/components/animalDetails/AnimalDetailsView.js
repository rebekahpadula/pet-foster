var Backbone = require('backbone');
var dispatcher = require('../events/dispatcher');
var _ = require('underscore');
var $ = require('jquery');
var myInfoModel = require('../myInfoPage/MyInfoModel');

var emailTemplate = _.template(require('../email/fosterEmailTemplate.html'));

var AnimalDetailsView = Backbone.View.extend({

    className: 'details',

    template: _.template(require('./animalDetailsView.html')),

    initialize: function () {
        var _this = this;
        this.listenTo(this.model, 'sync', function () {
            _this.render();
        });
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },

    events: {
        'click .pet-img': 'addToFavorites',
        'click .go-back': 'goBack',
        'click .foster-button': 'applyToFoster',
        'click .favorites-button': 'addToFavorites'
    },

    addToFavorites: function () {
        dispatcher.trigger('favorite', {
            animalId: this.model.get('id'),
            image: this.model.get('media').photos.photo[3]
        });
    },

    goBack: function () {
        window.history.back();
    },

    applyToFoster: function () {
        var data = Object.assign({
            animalName: this.model.get('name'),
            shelterName: this.model.get('contact').name
        }, myInfoModel.toJSON());

        var text = emailTemplate(data);

        $.post('/notify', {
            to: 'rebekah.adair@yahoo.com',
            text: text,
            subject: 'Interested in fostering',
            success: function () {
                alert('email sent!');
            }
        });
    }
});

module.exports = AnimalDetailsView;