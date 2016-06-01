var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var sendgridApiKey = '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';
var sendgrid = require('sendgrid')(sendgridApiKey);

var favorites = [];
var favoritesIds = 0;

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.post('/notify', function (req, res) {
    sendgrid.send({
        to: 'rebekah.adair@yahoo.com',
        from: 'myapp@myapp.com',
        subject: req.body.subject,
        text: req.body.text
    }, function (err, json) {
        if (err) { return console.error(err); }
        console.log(json);
        res.json(json);
    });
});

app.post('/favorites', function (req, res) {
    var favoritePet = {
        favoritesId: ++favoritesIds,
        image: req.body.image,
        id: req.body.animalId
    };

    var current = favorites.find(function (favorite) {
        return favorite.animalId === req.body.animalId;
    });

    if (current) {
        return res.sendStatus(400);
    }

    favorites.push(favoritePet);

    res.json(favoritePet);
});

app.get('/favorites', function (req, res) {
    res.json(favorites);
});

app.listen(3000);