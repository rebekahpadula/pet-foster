var Backbone = require('backbone');

var ListView = Backbone.View.extend({

    childView: function () {},

    initialize: function (options) {
        this.animalViews = [];
        this.listenTo(this.collection, 'all', this.render);
    },

    render: function () {
        var _this = this;

        this.removeChildren();

        this.animalViews = this.collection.map(function (model) {
            return new _this.childView({ model: model });
        });

        this.animalViews.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    },

    removeChildren: function () {
        this.animalViews.forEach(function (view) {
            view.remove();
        });
    }

});

module.exports = ListView;