const express = require('express')
const router = express.Router()
const apiRouter = require('./api-router')
const devRouter = require('./dev-router')

router.use('/', apiRouter)
router.use('/dev', devRouter)

module.exports = router