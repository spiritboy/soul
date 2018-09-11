var express = require('express')
    , router = express.Router()

router.use('/term', require('./term'))
router.use('/soul', require('./soul'))
module.exports = router
