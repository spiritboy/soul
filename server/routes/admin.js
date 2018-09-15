var express = require('express')
    , router = express.Router()
    , helper = require('../helper')
    , url = require('url')
    , Menu = require('../model/Menu')
    , db = require('../db');
router.get('/menus', function (req, res) {
    db.menus().then(function (d) {
        res.send(d);
    });
});

module.exports = router