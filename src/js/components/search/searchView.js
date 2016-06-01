// search page view

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var AnimalCollection = require('../collections/AnimalCollection');
var AnimalListView = require('../animalList/AnimalListView');
var flattenParsedXMLAttributes = require('../../flattenParsedXMLAttributes');
var api = require('../../api');
var ShelterListView = require('./ShelterListView');
var ShelterCollection = require('../collections/ShelterCollection');

var SearchView = Backbone.View.extend({

    events: {
        'change #type': 'getBreeds',
        'click #animal-search': 'searchAnimals',
        'keydown #shelters-zipcode': 'onKeyDown'
        // 'click #shelters-search': 'searchShelters'
    },

    className: 'search-view',

    template: _.template(require('./searchView.html')),

    initialize: function (options) {
        options = options || {};

        this.params = options.params;

        this.collection = new AnimalCollection();
        this.shelterCollection = new ShelterCollection();
        this.listenTo(this.shelterCollection, 'sync', this.renderShelters);
        this.listenTo(this.collection, 'sync reset', this.renderAnimals);
    },

    render: function () {
        var _this = this;
        var hasValue = false;

        // Add default values so the template doesn't throw errors
        var params = Object.assign({}, {
            breed: '',
            location: '',
            animal: ''
        }, this.params);

        this.$el.html(this.template(params));

        // Manually set the value of #type (animal)
        this.$('#type').val(params.animal);

        // If there was a breed in the query parameters
        if (params.breed) {
            // Populate list of breeds
            this.getBreeds(function () {
                // Manually set the value of #breed
                _this.$('#breed').val(params.breed);
                // Trigger a search
                _this.searchAnimals();
            });
            // Return, so we don't trigger the search at the bottom
            // of this function.
            return;
        }

        // Ensure at least one of the parameters has a value
        for (var prop in params) {
            if (params[prop]) {
                hasValue = true;
                break;
            }
        }

        if (params.animal) {
            this.getBreeds();
        }

        // If at least one of the parameters has a value, trigger
        // a search.
        if (hasValue) {
            this.searchAnimals();
        }
    },

    renderAnimals: function () {
        var animalListView = new AnimalListView({ collection: this.collection });

        this.$('.available-animal-slot').html(animalListView.$el);

        animalListView.render();
    },

    renderShelters: function () {
        var _this = this;

        this.shelterListView = new ShelterListView({ collection: this.shelterCollection });
        this.$('.shelters-slot').html(this.shelterListView.$el);

        this.shelterListView.render();

        this.listenTo(this.shelterListView, 'select', function (shelterId) {
            $.get('http://api.petfinder.com/shelter.getPets?key=' + api.key + '&format=json&id=' + shelterId, function (data) {
                var newUrl;

                data = flattenParsedXMLAttributes(data);
                _this.collection.reset(data.petfinder.pets.pet);

                // Clear out old query parameters
                if (window.history.pushState) {
                    newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash.split('?')[0];
                    window.history.pushState('', '', newUrl);
                }
            });
        });
    },

    getBreeds: function (callback) {
        var _this = this;
        var type = this.$('#type').val();
        $.get('http://api.petfinder.com/breed.list?key=' + api.key + '&format=json&animal=' + type, function (data) {
            data = flattenParsedXMLAttributes(data);
            _this.renderBreeds(data.petfinder.breeds.breed);
            if (callback) {
                callback();
            }
        });
    },

    renderBreeds: function (breeds) {
        breeds = [''].concat(breeds);

        var options = breeds.map(function (breed) {
            return $('<option>', {
                value: breed,
                text: breed
            });
        });

        this.$('#breed').html(options);
    },

    searchAnimals: function () {
        var newUrl;
        var params = '?' + $.param({
            location: this.$('#location').val(),
            breed: this.$('#breed').val(),
            animal: this.$('#type').val()
        });

        this.$('.available-animal-slot').empty();

        if (window.history.pushState) {
            newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + params + window.location.hash.split('?')[0];
            window.history.pushState('', '', newUrl);
        }

        this.collection.fetch({
            data: {
                location: this.$('#location').val(),
                breed: this.$('#breed').val(),
                animal: this.$('#type').val()
            }
        });
        // clearing shelter search form
        this.$('#shelters-zipcode').val('');
        this.$('select').val('');
    },

    searchShelters: function () {
        this.$('.available-animal-slot').empty();
        this.shelterCollection.fetch({
            data: {
                location: this.$('#shelters-zipcode').val()
            }
        });
        // clearing animal search form
        this.$('#location').val('');
        this.$('#breed').val('');
        this.$('#animal').val('');
        // this.renderShelters();
    },

    onKeyDown: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.searchShelters.bind(this), 1000);
    }

});

module.exports = SearchView;