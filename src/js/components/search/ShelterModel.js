// model for individual shelter

var Backbone = require('backbone');

var ShelterModel = Backbone.Model.extend({

    url: function () {
        return 'http://api.petfinder.com/shelter.get?key=20913d220b9b41cf17da56bb378048ad&id=' + this.ßget('id') + '&format=json';
    }

});

module.exports = ShelterModel;