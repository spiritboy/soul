var url = require('url');
var cors = require('cors')
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var db = require('./db');


var app = express();
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/saveData', function (req, res) {
    db.saveGroup(req.body).then(function (d) {
        res.send(d);
    });
});
app.get('/getdefinition', function (req, res) {
    db.getDefinition().then(function (d) {
        res.send(d);
    });
});

function searchNormalizer(searchObj) {
    delete searchObj['title'];
    delete searchObj['uid'];
    delete searchObj['menuUid'];
    return searchObj;
}

app.post('/searchMenu', function (req, res) {

    var searchObj = searchNormalizer(req.body);
    var proj = {"fkId": 1};

    for (let i in searchObj) {
        searchObj[i] = new RegExp(searchObj[i]);
        proj[i] = 1;
    }
    db.search(searchObj, proj).then(function (d) {
        res.send(d);
    }).catch(function (e) {
        res.send(e);
    })


});

app.get('/loadFk', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var queryParams = url_parts.query;
    db.loadfk(queryParams.fkId).then(function (data) {
        res.send(data);
    });
});
app.get('/getSource', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var queryParams = url_parts.query;
    res.send([{label: queryParams.filter, value: queryParams.filter}, {label: 'test', value: 'test'}]);
});
app.listen(3000);