let express = require('express')
    , router = express.Router()
    , helper = require('../helper')
    , url = require('url')
    , Menu = require('../model/Menu')
    , db = require('../db');
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
router.post('/saveData', function (req, res) {
    db.saveGroup(req.body).then(function (d) {
        res.send(d);
    });
});
router.get('/getdefinition/:language?', function (req, res) {
    db.getDefinition().then(function (d) {
        res.send(d);
    });
});
router.post('/searchMenu', function (req, res) {
    let lang = req.body.lang;
    let searchObj = searchNormalizer(req.body.data);
    db.getDefinition().then(function (data) {
        let menuDefinition = new Menu().deserialize(data);
        //calculate the projection from the menu structure ...
        let proj = menuDefinition.getProjection();
        db.search(searchObj, proj).then(function (d) {
            //prepare the results before send
            res.send(helper.prepareSearchResults(d,menuDefinition,lang));
        }).catch(function (e) {
            res.send(e);
        })
    });
});

router.get('/loadFk', function (req, res) {
    let url_parts = url.parse(req.url, true);
    let queryParams = url_parts.query;
    db.loadfk(queryParams.fkId).then(function (data) {
        res.send(data);
    });
});

function searchNormalizer(searchObj) {
    delete searchObj['title'];
    delete searchObj['uid'];
    delete searchObj['menuUid'];
    //regex
    for (let k in searchObj) {
        searchObj[k] = new RegExp(searchObj[k])
    }
    return searchObj;
}

module.exports = router