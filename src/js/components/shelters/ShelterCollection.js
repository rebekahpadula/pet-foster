var Backbone = require('backbone');
var $ = require('jquery');

var ShelterModel = require('../search/ShelterModel');

var ShelterCollection = Backbone.Collection.extend({

    model: ShelterModel,

    url: function () {
        return 'http://api.petfinder.com/shelter.find?key=20913d220b9b41cf17da56bb378048ad&format=json';
    },

    parse: function (response) {
        return flattenParsedXMLAttributes(response.petfinder.shelters.shelter);
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

module.exports = ShelterCollection;

// var ShelterCollection = Backbone.Collection.extend({

//     model: ShelterModel,

//     initialize: function (models, options) {
//         this.shelterId = options.shelterId;
//     },

//     url: function () {
//         if (this.shelterId) {
//             return '/shelters/' + this.shelterId + '/animals';
//         } else {
//             return '/animals';
//         }
//     }
// });

// var sc = new ShelterCollection({ shelterId: 2 });

// sc.fetch(); // GET /shelters/2/animals

// sc.create({
//     name: 'Buddy',
//     age: 3,
//     breed: 'Rottweiler'
// }); // POST /shelters/2/animals

// create endpoints on server

// module.exports = ShelterCollection;