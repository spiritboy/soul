var express = require('express')
    , router = express.Router()
    , db = require('../db/term');


router.get('/byId/:language/:id', function (req, res) {
    console.log('bid');
    db.byId(req.params.language, req.params.id).then(d => {
        res.send(d.length > 0 ? d[0] : null)
    })
});
router.get('/:language/:term/:filter*?', function (req, res) {
    db.terms(db[req.params.term], req.params.language, req.params.filter).then(d => {
        res.send(d)
    })
});
module.exports = router;
