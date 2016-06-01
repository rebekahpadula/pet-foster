var Backbone = require('backbone');
var $ = require('jquery');

var AnimalCollection = require('./components/collections/AnimalCollection');
var DashboardView = require('./components/dashboard/DashboardView');
var dispatcher = require('./components/events/dispatcher');
var MyInfoView = require('./components/myInfoPage/myInfoView');
var SearchView = require('./components/search/searchView');
var FavoritesView = require('./components/favoritesPage/FavoritesView');
var ShelterView = require('./components/search/ShelterView');
var ShelterListView = require('./components/search/ShelterListView');
var AvailableAnimalModel = require('./components/animalList/AnimalModel');
var ShelterModel = require('./components/search/ShelterModel');
var AnimalDetailsView = require('./components/animalDetails/AnimalDetailsView');
var ShelterCollection = require('./components/collections/ShelterCollection');
var favoritesCollection = require('./components/collections/favoritesCollection');

function getQueryParameters (str) {
    return (str || document.location.search)
        .replace(/(^\?)/, '')
        .split('&')
        .reduce(function (a, x, i) {
            var n = x.split('=');
            var y = n[0];
            var z = n[1];
            try { z = JSON.parse(z); } catch (e) { }
            a[y] = a[y] ? typeof a[y] === 'object' ? (a[y].push(z) && a[y]) : [a[y], z] : z;
            return a;
        }, {});
}

var AppRouter = Backbone.Router.extend({

    routes: {
        '': 'dashboard',
        'my-info': 'myInfo',
        'search': 'search',
        'favorites': 'favorites',
        'details/:id': 'profile', // for individual pet views, availableAnimalListItemView
        'search/shelter/:id': 'shelters'
    },

    dashboard: function () {
        var animalCollection = new AnimalCollection();

        animalCollection.fetch({
            data: {
                location: 29033,
                count: 40
            }
        });

        dispatcher.trigger('app:show', new DashboardView({
            collection: animalCollection
        }));
    },

    myInfo: function () {
        dispatcher.trigger('app:show', new MyInfoView());
    },

    search: function () {
        var params = getQueryParameters();
        dispatcher.trigger('app:show', new SearchView({ params: params }));
    },

    favorites: function () {
        favoritesCollection.fetch();
        dispatcher.trigger('app:show', new FavoritesView({
            favotiesCollection: favoritesCollection
        }));
    },

    profile: function (id) {
        id = parseInt(id);

        var model = new AvailableAnimalModel();

        model.set({
            id: id
        });

        // var animalCollection = new AnimalCollection();
        // var model = animalCollection.get(id);

        model.fetch({
            success: function () {
                dispatcher.trigger('app:show', new AnimalDetailsView({ model: model }));
            }
        });
    }
});

module.exports = AppRouter;