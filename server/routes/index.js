var express = require('express')
    , router = express.Router()

router.use('/term', require('./term'))
router.use('/soul', require('./soul'))
router.use('/admin', require('./admin'))
module.exports = router
