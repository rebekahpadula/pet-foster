// view for user info

var Backbone = require('backbone');
var _ = require('underscore');

var myInfoModel = require('./MyInfoModel');
var $ = require('jquery');

var MyInfoView = Backbone.View.extend({

    className: 'infoView',

    template: _.template(require('./myInfoView.html')),

    render: function () {
        this.$el.html(this.template(myInfoModel.attributes));
        this.$('input[name=info-fostered-before]').prop('checked', myInfoModel.get('fostered'));
        this.$('input[name=info-own-pets]').prop('checked', myInfoModel.get('pets'));
    },

    events: {
        'click .info-button': 'saveChanges',
        'keydown': 'onKeyDown'
    },

    saveChanges: function () {
        var infoName = this.$('#info-name').val();
        var infoEmail = this.$('#info-email').val();
        var infoZipCode = parseInt(this.$('#info-zipcode').val());
        var infoVet = this.$('input[name=info-vet]').val();
        var fosteredBefore = this.$('input[name=info-fostered-before]:checked').val() === 'on';
        var ownPets = this.$('input[name=info-own-pets]:checked').val() === 'on';

        myInfoModel.set({
            name: infoName,
            email: infoEmail,
            zipcode: infoZipCode,
            vet: infoVet,
            fostered: fosteredBefore,
            pets: ownPets
        });
        
        window.location.hash = '';
    },

    onKeyDown: function (e) {
        if (e.keyCode === 13) {
            this.saveChanges();
        }
    }
});

module.exports = MyInfoView;
