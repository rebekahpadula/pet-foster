// model for individual animal

var Backbone = require('backbone');

var AvailableAnimalModel = Backbone.Model.extend({

    url: function () {
        return 'http://api.petfinder.com/pet.get?key=20913d220b9b41cf17da56bb378048ad&format=json&id=' + this.get('id');
    },

    parse: function (response) {
        return flattenParsedXMLAttributes(response.petfinder.pet);
    }
});

var flattenParsedXMLAttributes = function (obj, parent) {
    var res = obj;

    if (Object.prototype.toString.call(obj) === '[object Array]') {
        res = obj.concat();
        for (var i = 0; i < obj.length; i++) {
            res[i] = flattenParsedXMLAttributes(res[i], res);
        }
    } else if (typeof res === 'object') {
        res = Object.assign({}, obj);
        for (var prop in res) {
            res[prop] = flattenParsedXMLAttributes(res[prop], res, prop);
            if (prop.indexOf('$t') === 0 && parent) {
                res = res[prop];
            }
        }
    }

    return res;
};

module.exports = AvailableAnimalModel;