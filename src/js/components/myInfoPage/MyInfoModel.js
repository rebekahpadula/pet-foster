// model for user info

var Backbone = require('backbone');
// var _ = require('underscore');
// var $ = require('jquery');

var MyInfoModel = Backbone.Model.extend({

    defaults: {
        name: '',
        email: '',
        zipcode: '',
        vet: ''
    },

    initialize: function () {
        var local = window.localStorage.info;
        this.set(local ? JSON.parse(local) : {});
        this.on('change', this.localSave);
    },

    localSave: function () {
        window.localStorage.info = JSON.stringify(this.toJSON());
    }

});

module.exports = new MyInfoModel();