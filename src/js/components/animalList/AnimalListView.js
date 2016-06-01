var ListView = require('../listView/ListView');
var AnimalListItemView = require('./AnimalListItemView');

module.exports = ListView.extend({
    tagName: 'ul',
    className: 'availableAnimals',
    childView: AnimalListItemView
});