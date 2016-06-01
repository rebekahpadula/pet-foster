// animal collection

// API Key
// 20913d220b9b41cf17da56bb378048ad

var key = require('../../api').key;

var flattenParsedXMLAttributes = require('../../flattenParsedXMLAttributes');

var Backbone = require('backbone');
var $ = require('jquery');

var AnimalCollection = Backbone.Collection.extend({

    // model: AvailableAnimalModel,

    url: function () {
        return 'http://api.petfinder.com/pet.find?key=' + key + '&format=json';
    },

    parse: function (response) {
        return flattenParsedXMLAttributes(response.petfinder.pets.pet);
    }
});

module.exports = AnimalCollection;