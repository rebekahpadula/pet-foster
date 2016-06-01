var ListView = require('../listView/ListView');
var FavoritesItemView = require('./FavoritesItemView');

var favoritesCollection = require('../collections/favoritesCollection');

module.exports = ListView.extend({
    tagName: 'ul',
    className: 'availableAnimals favorite-animals',
    childView: FavoritesItemView,
    collection: favoritesCollection
});