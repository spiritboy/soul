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
router.get('/group', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let queryParams = url_parts.query;
    db.group(queryParams.muid,queryParams.guid).then(function (d) {
        res.send(d);
    });
});

router.post('/saveGroup', function (req, res) {
    db.saveGroup_admin(req.body).then(function (d) {
        res.send(d);
    });
});

router.get('/menu', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let queryParams = url_parts.query;
    db.menu(queryParams.uid).then(function (d) {
        console.log(d);
        res.send(d);
    });
});

router.post('/saveMenu', function (req, res) {
    db.saveMenu_admin(req.body).then(function (d) {
        console.log(d);
        res.send(d);
    });
});
router.get('/question', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let qp = url_parts.query;
    db.question(qp.muid,qp.guid,qp.quid).then(function (d) {
        console.log(d);
        res.send(d);
    });
});

router.post('/saveQuestion', function (req, res) {
    db.saveQuestion_admin(req.body).then(function (d) {
        res.send(d);
    });
});
module.exports = router